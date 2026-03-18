// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title BountyEscrow
 * @notice Prototype: Bitcoin MEV / Tx Accelerator bounty escrow.
 *         Users lock a bounty for a Bitcoin txid; miner proves they included it and claims.
 *         On Hemi mainnet, verification would use hBK (tx in block + coinbase → miner).
 *         This version uses EOA signature for demo (miner = signer of claim message).
 */
contract BountyEscrow {
    struct Bounty {
        bytes32 btcTxidHash;      // keccak256(btcTxid) for storage
        uint256 amountWei;        // bounty amount in wei
        uint256 expiryBlock;      // refund allowed after this block
        address poster;          // who posted the bounty
        bool claimed;            // true once claimed
        address claimer;         // who claimed (miner proxy in demo)
    }

    mapping(uint256 => Bounty) public bounties;
    uint256 public nextBountyId;
    mapping(bytes32 => uint256) public txidHashToBountyId; // first bounty per txid

    event BountyPosted(uint256 indexed bountyId, bytes32 btcTxidHash, uint256 amountWei, uint256 expiryBlock, address poster);
    event BountyClaimed(uint256 indexed bountyId, address claimer, uint256 blockHeight);
    event BountyRefunded(uint256 indexed bountyId, address poster);

    error AlreadyClaimed();
    error NotExpired();
    error NotPoster();
    error InvalidSignature();
    error InvalidBounty();
    error WrongValue();

    /**
     * @notice Post a bounty for a Bitcoin txid. Call with msg.value = bounty amount.
     * @param btcTxidHex  Bitcoin txid as hex string (e.g. 64-char hex).
     * @param expiryBlock Bitcoin block height after which poster can refund.
     */
    function postBounty(string calldata btcTxidHex, uint256 expiryBlock) external payable {
        if (msg.value == 0) revert WrongValue();
        bytes32 h = keccak256(abi.encodePacked(btcTxidHex));
        nextBountyId++;
        bounties[nextBountyId] = Bounty({
            btcTxidHash: h,
            amountWei: msg.value,
            expiryBlock: expiryBlock,
            poster: msg.sender,
            claimed: false,
            claimer: address(0)
        });
        if (txidHashToBountyId[h] == 0) txidHashToBountyId[h] = nextBountyId;
        emit BountyPosted(nextBountyId, h, msg.value, expiryBlock, msg.sender);
    }

    /**
     * @notice Claim a bounty. Miner (or authorized claimer) signs (bountyId, blockHeight, recipient).
     *         In production on Hemi: verify Bitcoin signature from coinbase address for blockHeight.
     * @param bountyId     Id of the bounty.
     * @param blockHeight  Bitcoin block height where tx was included (for verification / event).
     * @param recipient    Hemi address to receive the bounty.
     * @param v,r,s        EOA signature over keccak256(abi.encodePacked(bountyId, blockHeight, recipient)).
     */
    function claim(
        uint256 bountyId,
        uint256 blockHeight,
        address recipient,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        Bounty storage b = bounties[bountyId];
        if (b.amountWei == 0) revert InvalidBounty();
        if (b.claimed) revert AlreadyClaimed();

        bytes32 messageHash = keccak256(abi.encodePacked(bountyId, blockHeight, recipient));
        bytes32 ethSignedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));
        address signer = ecrecover(ethSignedHash, v, r, s);
        if (signer == address(0)) revert InvalidSignature();

        // In production: check signer is the miner of Bitcoin block blockHeight (via hBK).
        // For demo we accept any signer as "miner" and pay recipient.
        b.claimed = true;
        b.claimer = recipient;

        (bool ok,) = recipient.call{ value: b.amountWei }("");
        require(ok, "Transfer failed");

        emit BountyClaimed(bountyId, recipient, blockHeight);
    }

    /**
     * @notice Refund bounty to poster after expiry if not claimed.
     */
    function refund(uint256 bountyId) external {
        Bounty storage b = bounties[bountyId];
        if (b.amountWei == 0) revert InvalidBounty();
        if (b.claimed) revert AlreadyClaimed();
        if (block.number <= b.expiryBlock) revert NotExpired();
        if (msg.sender != b.poster) revert NotPoster();

        uint256 amount = b.amountWei;
        b.amountWei = 0;

        (bool ok,) = b.poster.call{ value: amount }("");
        require(ok, "Refund failed");

        emit BountyRefunded(bountyId, b.poster);
    }

    function getBounty(uint256 bountyId) external view returns (
        bytes32 btcTxidHash,
        uint256 amountWei,
        uint256 expiryBlock,
        address poster,
        bool claimed,
        address claimer
    ) {
        Bounty storage b = bounties[bountyId];
        return (b.btcTxidHash, b.amountWei, b.expiryBlock, b.poster, b.claimed, b.claimer);
    }
}

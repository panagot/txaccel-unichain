# TxAccel — Bitcoin MEV Marketplace (Prototype)

A **mempool.space-inspired** prototype for a Bitcoin transaction accelerator / MEV marketplace on [Hemi](https://hemi.xyz): users post bounties for Bitcoin txids; miners include the tx, sign a message, and claim the bounty on Hemi.

## What’s in this repo

- **React (Vite + TypeScript)** — Dark, data-focused UI inspired by [mempool.space](https://mempool.space). Custom logo, DM Sans + JetBrains Mono, amber accent.
- **Solidity contract** — `contracts/BountyEscrow.sol`: post bounty (txid + ETH), claim (with EOA signature for demo; on Hemi this would use Bitcoin sig + hBK), refund after expiry.
- **Wagmi + viem** — Connect wallet, read bounties, post and (with deployed contract) claim.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Connect a wallet (e.g. MetaMask). Without a deployed contract you’ll see the **demo table** and a disabled post flow.

## Deploy the contract

1. Compile and deploy `contracts/BountyEscrow.sol` to Sepolia (or Hemi testnet) with Solidity 0.8.19+.
2. Set the env var for the front end:
   ```bash
   echo "VITE_BOUNTY_ESCROW_ADDRESS=0xYourDeployedAddress" > .env.local
   ```
3. Restart `npm run dev`. You can now post bounties and (as “miner”) sign and call `claim(bountyId, blockHeight, recipient, v, r, s)`.

## Claim flow (miner)

1. Miner includes the user’s Bitcoin tx in a block.
2. Miner signs the message: `keccak256(abi.encodePacked(bountyId, blockHeight, recipient))` (Ethereum signed message).
3. Miner calls `claim(bountyId, blockHeight, recipient, v, r, s)` on the escrow contract. The contract pays `recipient`.

On Hemi mainnet, verification would use hBK (tx in block + coinbase → miner) and a Bitcoin signature instead of an EOA signature.

## Design

- **Theme:** Dark (`#0a0a0b`), surface panels, border `#27272a`, accent `#f59e0b`.
- **Fonts:** DM Sans (UI), JetBrains Mono (txids, amounts, addresses).
- **Logo:** Custom SVG (block + arrow + bounty dot) in `src/components/Logo.tsx`.

## Links

- [Hemi grants](https://docs.hemi.xyz/incentives/grants)
- [mempool.space](https://mempool.space)

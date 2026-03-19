# TxAccel — Bitcoin tx bounties on Unichain

A **mempool.space-inspired** prototype: users post **ETH bounties on Unichain** for **Bitcoin txids**; miners include the tx, attest, and **claim on Unichain**.

## What’s in this repo

- **React (Vite + TypeScript)** — Dark, data-focused UI. DM Sans + JetBrains Mono, amber accent.
- **Solidity** — `contracts/BountyEscrow.sol`: post bounty (txid + ETH), claim (EOA signature in demo; production should use Bitcoin miner attestation), refund after expiry.
- **Wagmi + viem** — Wallets target **Unichain** (mainnet `130`) and **Unichain Sepolia** (`1301`). See [Unichain network info](https://docs.unichain.org/docs/technical-information/network-information).

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:5193> (this repo uses **port 5193** so it doesn’t clash with other Vite apps on 5173/5174). Connect a wallet on **Unichain Sepolia** or **Unichain** (add the network in MetaMask if needed). Without a deployed contract you’ll see the **demo table** and a disabled post flow.

## Deploy the contract

1. Compile and deploy `contracts/BountyEscrow.sol` to **Unichain Sepolia** (recommended) or **Unichain mainnet** with Solidity 0.8.19+.
2. Set the front-end env var:

   ```bash
   echo "VITE_BOUNTY_ESCROW_ADDRESS=0xYourDeployedAddress" > .env.local
   ```

3. Restart `npm run dev`. Post bounties and use **Claim as miner** with the demo EOA signature path.

**Note:** `refund()` compares `expiryBlock` to **Unichain L2 `block.number`**, not Bitcoin height. For testing, use an L2 block target you control; the UI label “expiry block” is simplified.

## Claim flow (miner) — demo

1. Miner includes the user’s Bitcoin tx in a block.
2. Miner signs `keccak256(abi.encodePacked(bountyId, blockHeight, recipient))` (Ethereum signed message in this prototype).
3. Miner calls `claim(bountyId, blockHeight, recipient, v, r, s)` on Unichain.

## Builder Open Call

Draft answers for the Uniswap Foundation **Builder Open Call** live in [`docs/BUILDER_OPEN_CALL_SUBMISSION.md`](docs/BUILDER_OPEN_CALL_SUBMISSION.md). Form: [Builder Open Call](https://share.hsforms.com/1br6jbotQSvussdlWepfayQsdca9).

## Links

- [Unichain](https://www.unichain.org/)
- [Unichain docs](https://docs.unichain.org/docs)
- [Uniswap Foundation — Grants](https://www.uniswapfoundation.org/grants)
- [mempool.space](https://mempool.space)

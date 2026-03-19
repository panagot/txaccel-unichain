# Builder Open Call — draft answers (TxAccel / Unichain)

Use this as copy-paste prep for the [Unichain Builder Open Call](https://share.hsforms.com/1br6jbotQSvussdlWepfayQsdca9). Replace bracketed placeholders before submitting.

---

## First name*

`[Your first name]`

## Last name

`[Your last name]`

## Email*

`[your@email.com]`

## Telegram handle*

`[e.g. @yourhandle]` — one team member

## How do you want to collaborate with Unichain?*

**Build on Unichain**

## What support are you looking for?*

Check as needed (typical):

- **Grants & Funding**
- **Technical Support** (optional)
- **Marketing & Distribution** (optional, if you want GTM help)

## Please share more details about what support you need*

We are building **TxAccel**: a **BTC‑Fi** prototype where users lock **ETH on Unichain** as a bounty for **Bitcoin transaction inclusion**; miners (or their delegates) prove inclusion and claim on **Unichain**. We seek **grant funding** to (1) deploy and harden `BountyEscrow` on **Unichain Sepolia → mainnet**, (2) replace the demo **EOA claim path** with a **production miner attestation** design (Bitcoin signature / inclusion proof as documented in our README), and (3) ship **documentation + minimal integrations** so the bounty board is usable by wallets and mining ops. Optional: **technical feedback** on verification assumptions and **distribution** to DeFi/BTC builder communities.

## Project name*

**TxAccel** (Bitcoin tx bounties on Unichain)

## Project description*

TxAccel is an open-source **bounty marketplace** for **Bitcoin mempools**: users post a **Bitcoin txid** and escrow **ETH on Unichain**; miners who include the transaction can **claim the bounty on Unichain** after proving eligibility. The app provides a **mempool.space-style** board, **post bounty** and **claim** flows, and a reference **Solidity escrow**. The current build uses an **EOA signature** for demos; the roadmap is **trust-minimized miner verification** aligned with BTC‑Fi. **Unichain Function:** **BTC‑Fi**. **Why Unichain:** fast, low-cost **ETH settlement** for incentives while keeping **Bitcoin** as the execution domain for inclusion — matching Unichain’s **BTC‑Fi** builder category and DeFi-native liquidity.

## Project Stage*

**Seeking grants** (adjust if you already have funding or are hackathon-only)

## Daily active users*

`n/a` (prototype / pre-launch) — or your real number

## Total Value Locked*

`n/a` — or your real number

## Link to deploy contract*

`https://sepolia.uniscan.xyz/address/[YOUR_DEPLOYED_ADDRESS]`  
(or mainnet Uniscan when live)  
If not deployed yet: deploy first, or write **“Deploying week of [date] — contract repo: [GitHub link]”** only if the form allows free text.

## Link to public research *

- README + architecture: `[YOUR_GITHUB_URL]` (e.g. `https://github.com/[you]/unichain-tx-bounties`)
- Optional: link to this doc or a short Mirror/Notion **1-pager** on bounty + attestation design.

## Link to project discord*

`n/a` or `[Discord invite]` — create a lightweight server if the field is mandatory.

## Select Unichain Function*

**BTC‑Fi** (or the exact dropdown label matching BTC‑Fi)

## Status on Unichain*

Pick the option that matches you best, for example:

- **Testnet deployed** — if `BountyEscrow` is on Unichain Sepolia and verified on Sepolia Uniscan.
- **Mainnet deployed** — if on chain 130.
- **In development** — if you are submitting before deploy (weaker; prefer deploying to Sepolia first per [Get Funded](https://docs.uniswap.org/builder-support/get-funded) guidance).

---

## Checklist before send

- [ ] Wallet connect works on **Unichain Sepolia** or **mainnet** with your deployed contract.
- [ ] GitHub repo is **public** with updated README (no references to other L2s you’re not using).
- [ ] Live demo URL (e.g. Vercel) points at the Unichain build.
- [ ] Terms checkboxes on the form accepted.

---

*Disclaimer: This is draft text, not legal or investment advice. Consult counsel for compliance (mining, payments, securities) in your jurisdiction.*

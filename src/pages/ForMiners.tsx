import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'

export function ForMiners() {
  return (
    <div className="min-h-screen bg-surface-950 bg-grid">
      <header className="border-b border-border bg-surface-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-white no-underline">
            <Logo className="w-9 h-9 text-zinc-300" />
            <span className="font-semibold text-lg tracking-tight">TxAccel</span>
          </Link>
          <Link
            to="/"
            className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
          >
            ← Back
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">
          How Bitcoin miners earn the reward
        </h1>
        <p className="text-zinc-400 text-sm mb-10">
          Step-by-step: from discovering bounties to receiving payment on Hemi.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-mono text-xs flex items-center justify-center">1</span>
              Discover open bounties
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-2">
              On the TxAccel homepage, the <strong className="text-zinc-300">Open bounties</strong> table lists every active bounty: Bitcoin txid (or its hash), reward amount, and status. Use this board to decide which transactions to include in your next block.
            </p>
            <p className="text-zinc-500 text-xs">
              You can also use the same data via an API or indexer if we expose one. The contract stores each bounty with a unique ID.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-mono text-xs flex items-center justify-center">2</span>
              Include the transaction in your block
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-2">
              Add the user’s Bitcoin transaction to your block template and mine the block as usual. Once the block is broadcast and confirmed, that transaction is included on the Bitcoin chain. No special integration is required beyond using the txid from our board.
            </p>
            <p className="text-zinc-500 text-xs">
              Tip: Check the tx on <a href="https://mempool.space" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">mempool.space</a> to confirm it’s in the mempool and get block height after you mine.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-mono text-xs flex items-center justify-center">3</span>
              Sign the claim message
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-2">
              To prove you are the miner (and to bind the claim to a specific recipient), you sign a message that includes the <strong className="text-zinc-300">bounty ID</strong>, the <strong className="text-zinc-300">Bitcoin block height</strong> where you included the tx, and the <strong className="text-zinc-300">Hemi address</strong> that should receive the reward.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-2 font-mono text-xs bg-surface-800 px-3 py-2 rounded border border-border">
              message = keccak256(bountyId, blockHeight, recipientAddress)
            </p>
            <p className="text-zinc-500 text-xs">
              In this prototype you sign with your Ethereum-style wallet (e.g. MetaMask). On Hemi mainnet, the contract would verify a <strong className="text-zinc-400">Bitcoin</strong> signature from the address that received the block reward (coinbase) for that block, so only the real miner can claim.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-mono text-xs flex items-center justify-center">4</span>
              Submit the claim on Hemi
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-2">
              Call the escrow contract’s <strong className="text-zinc-300">claim(bountyId, blockHeight, recipient, v, r, s)</strong> function with your signature. The contract checks the signature and, if valid, sends the escrowed bounty to the recipient address. The bounty is then marked as claimed so it cannot be claimed again.
            </p>
            <p className="text-zinc-500 text-xs">
              On the TxAccel app, use the <strong className="text-zinc-400">Claim as miner</strong> form: enter bounty ID and block height, set the recipient (default is your connected wallet), then click “Sign & claim”. Your wallet will ask you to sign; after you submit the transaction, the reward is sent on Hemi.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-mono text-xs flex items-center justify-center">5</span>
              You receive the reward
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              The reward (e.g. ETH or HEMI) is transferred to the recipient address you specified. You need a wallet that supports the Hemi network (or the chain where the contract is deployed) to receive it. No further action is required once the claim transaction confirms.
            </p>
          </section>

          <section className="border-t border-border pt-8">
            <h2 className="text-base font-medium text-white mb-2">Summary</h2>
            <ul className="text-zinc-400 text-sm space-y-1 list-disc list-inside">
              <li>Use the Open bounties table (or API) to see which Bitcoin txids have rewards.</li>
              <li>Include that tx in your next mined block.</li>
              <li>Sign the claim message (bountyId + blockHeight + recipient) with the key that proves you’re the miner (Bitcoin coinbase key on Hemi mainnet; EOA in this demo).</li>
              <li>Submit <code className="text-zinc-300 font-mono">claim(...)</code> on the escrow contract; the bounty is sent to your chosen recipient.</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-muted text-sm font-medium"
          >
            ← Back to TxAccel
          </Link>
        </div>
      </main>
    </div>
  )
}

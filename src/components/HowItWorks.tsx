import { Link } from 'react-router-dom'

const STEPS = [
  {
    title: 'Post bounty',
    body: 'Submit a Bitcoin txid and lock a reward in ETH. Your bounty is escrowed on Unichain.',
  },
  {
    title: 'Miner includes tx',
    body: 'A miner sees your bounty on this board, includes your transaction in their next block.',
  },
  {
    title: 'Sign & claim',
    body: 'The miner signs a message proving they mined the block. Contract verifies and releases the bounty to them.',
  },
]

export function HowItWorks() {
  return (
    <section className="border-t border-border pt-10">
      <h2 className="text-lg font-semibold text-white mb-6">How it works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEPS.map((step, i) => (
          <div key={step.title} className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent font-mono font-semibold flex items-center justify-center text-sm">
              {i + 1}
            </span>
            <div>
              <h3 className="text-white font-medium mb-1">{step.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-zinc-500 text-sm">
        Miners: <Link to="/for-miners" className="text-accent hover:underline">see how to earn the reward</Link> (step-by-step).
      </p>
    </section>
  )
}

import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-border mt-16 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-zinc-500 text-sm">
          TxAccel — Bitcoin MEV marketplace prototype. Built for{' '}
          <a
            href="https://hemi.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Hemi
          </a>
          .
        </p>
        <div className="flex gap-6">
          <Link to="/for-miners" className="text-zinc-500 hover:text-white text-sm transition-colors">
            For miners
          </Link>
          <a
            href="https://docs.hemi.xyz/incentives/grants"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white text-sm transition-colors"
          >
            Grants
          </a>
          <a
            href="https://mempool.space"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white text-sm transition-colors"
          >
            mempool.space
          </a>
        </div>
      </div>
    </footer>
  )
}

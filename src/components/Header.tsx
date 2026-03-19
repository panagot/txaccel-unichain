import { Link } from 'react-router-dom'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Logo } from './Logo'

export function Header() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <header className="border-b border-border bg-surface-900/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-white no-underline">
          <Logo className="w-9 h-9 text-zinc-300" />
          <span className="font-semibold text-lg tracking-tight">TxAccel</span>
          <span className="text-zinc-500 text-sm font-mono hidden sm:inline">/ Unichain</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/for-miners"
            className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
          >
            For miners
          </Link>
          <a
            href="https://www.uniswapfoundation.org/grants"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
          >
            Grants
          </a>
          {isConnected && address ? (
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-zinc-500 max-w-[120px] truncate sm:max-w-none">
                {address.slice(0, 6)}…{address.slice(-4)}
              </span>
              <button
                type="button"
                onClick={() => disconnect()}
                className="text-zinc-400 hover:text-white text-sm font-medium px-3 py-1.5 rounded border border-border hover:border-border-hover transition-colors"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => connect({ connector: connectors[0] })}
              disabled={isPending}
              className="bg-accent hover:bg-accent-muted text-surface-950 font-semibold text-sm px-4 py-2 rounded transition-colors disabled:opacity-50"
            >
              {isPending ? 'Connecting…' : 'Connect wallet'}
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

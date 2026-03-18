import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Header } from './components/Header'
import { Stats } from './components/Stats'
import { PostBountyForm } from './components/PostBountyForm'
import { MinerClaimForm } from './components/MinerClaimForm'
import { BountyTable } from './components/BountyTable'
import { HowItWorks } from './components/HowItWorks'
import { ValueProp } from './components/ValueProp'
import { Footer } from './components/Footer'
import { ForMiners } from './pages/ForMiners'

export type SimulatedBounty = {
  id: number
  txid: string
  amount: string
  expiryBlock: string
}

function Home() {
  const [simulatedBounties, setSimulatedBounties] = useState<SimulatedBounty[]>([])

  const handleSimulatePost = (txid: string, amount: string, expiryBlock: string) => {
    setSimulatedBounties((prev) => [
      ...prev,
      { id: prev.length + 1, txid, amount, expiryBlock },
    ])
  }

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <section className="mb-14">
          <span className="inline-block text-zinc-500 text-xs font-medium uppercase tracking-wider mb-3">
            Hemi Grant Candidate · Bitcoin-Aware hApp
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-2">
            Bitcoin MEV Marketplace
          </h1>
          <p className="text-zinc-400 font-mono text-sm max-w-xl mb-4">
            Post a bounty for your Bitcoin tx. Miners include it, prove inclusion, and claim on Hemi — trustless escrow, no custodian.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/for-miners"
              className="text-accent hover:text-accent-muted text-sm font-medium"
            >
              How miners earn →
            </Link>
            <a
              href="https://docs.hemi.xyz/incentives/grants"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-300 text-sm"
            >
              Apply for Hemi grants
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-6 text-zinc-500 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
              Trustless escrow on Hemi
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
              Miner proves inclusion → gets paid
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
              Ready for hBK / Bitcoin sig on mainnet
            </li>
          </ul>
        </section>

        <Stats simulatedBounties={simulatedBounties} />
        <ValueProp />
        <BountyTable simulatedBounties={simulatedBounties} />
        <PostBountyForm onSimulatePost={handleSimulatePost} />
        <MinerClaimForm />
        <HowItWorks />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-surface-950 bg-grid">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/for-miners" element={<ForMiners />} />
      </Routes>
    </div>
  )
}

export default App

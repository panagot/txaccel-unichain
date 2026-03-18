import { useReadContract } from 'wagmi'
import { BOUNTY_ESCROW_ABI } from '../abi'
import { CONTRACT_ADDRESS, IS_CONTRACT_DEPLOYED } from '../config'
import type { SimulatedBounty } from '../App'

const DEMO_BOUNTY_COUNT = 2
const DEMO_VOLUME_ETH = 0.05 + 0.02 // 0.07 ETH from the two static demo rows

type StatsProps = {
  simulatedBounties?: SimulatedBounty[]
}

export function Stats({ simulatedBounties = [] }: StatsProps) {
  const { data: nextId } = useReadContract({
    address: IS_CONTRACT_DEPLOYED ? CONTRACT_ADDRESS : undefined,
    abi: BOUNTY_ESCROW_ABI,
    functionName: 'nextBountyId',
  })

  const openBounties = IS_CONTRACT_DEPLOYED && nextId != null
    ? Number(nextId)
    : DEMO_BOUNTY_COUNT + simulatedBounties.length

  const simulatedVolume = simulatedBounties.reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0)
  const totalVolumeEth = DEMO_VOLUME_ETH + simulatedVolume
  const totalVolumeStr = IS_CONTRACT_DEPLOYED
    ? '—'
    : `${totalVolumeEth.toFixed(2)} ETH`

  const claimsStr = IS_CONTRACT_DEPLOYED ? '—' : '0'

  const items = [
    { label: 'Open bounties', value: String(openBounties), sub: 'live' },
    { label: 'Total volume', value: totalVolumeStr, sub: 'locked' },
    { label: 'Claims', value: claimsStr, sub: 'all time' },
  ]

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      {items.map(({ label, value, sub }) => (
        <div
          key={label}
          className="bg-surface-900 border border-border rounded-lg px-5 py-4"
        >
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="font-mono text-xl text-white font-medium">{value}</p>
          <p className="text-zinc-500 text-xs mt-0.5">{sub}</p>
        </div>
      ))}
    </section>
  )
}

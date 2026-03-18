import { useReadContract } from 'wagmi'
import { BOUNTY_ESCROW_ABI } from '../abi'
import { CONTRACT_ADDRESS, IS_CONTRACT_DEPLOYED } from '../config'
import { InfoIcon } from './Tooltip'
import type { SimulatedBounty } from '../App'

const DEMO_BOUNTIES: { id: number; txid: string; amount: string; status: string }[] = [
  { id: 1, txid: 'a1b2c3d4e5f6...', amount: '0.05 ETH', status: 'Open' },
  { id: 2, txid: 'f6e5d4c3b2a1...', amount: '0.02 ETH', status: 'Open' },
]

type BountyTableProps = {
  simulatedBounties?: SimulatedBounty[]
}

function formatTxid(txid: string) {
  if (txid.length <= 20) return txid
  return `${txid.slice(0, 10)}…${txid.slice(-8)}`
}

export function BountyTable({ simulatedBounties = [] }: BountyTableProps) {
  const { data: nextId } = useReadContract({
    address: IS_CONTRACT_DEPLOYED ? CONTRACT_ADDRESS : undefined,
    abi: BOUNTY_ESCROW_ABI,
    functionName: 'nextBountyId',
  })
  const count = IS_CONTRACT_DEPLOYED && nextId != null ? Number(nextId) : 0
  const showDemo = !IS_CONTRACT_DEPLOYED
  const demoRows = showDemo
    ? [
        ...DEMO_BOUNTIES,
        ...simulatedBounties.map((b, i) => ({
          id: DEMO_BOUNTIES.length + i + 1,
          txid: b.txid,
          amount: `${b.amount} ETH`,
          status: 'Open' as const,
          key: `sim-${b.txid}-${i}`,
        })),
      ]
    : []

  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-1.5">
          Open bounties
          <InfoIcon content="Miners use this list to see which Bitcoin txids have bounties. Include the tx in your block, then sign and claim in the form above." />
        </h2>
        <span className="font-mono text-zinc-500 text-sm">
          {count > 0 ? `${count} bounty(ies)` : showDemo ? `Demo: ${demoRows.length} bounty(ies)` : 'No bounties'}
        </span>
      </div>
      <div className="border border-border rounded-xl overflow-hidden bg-surface-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border bg-surface-800/80">
                <th className="px-4 py-3 text-zinc-500 text-xs font-medium uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-zinc-500 text-xs font-medium uppercase tracking-wider">
                  Txid
                </th>
                <th className="px-4 py-3 text-zinc-500 text-xs font-medium uppercase tracking-wider">
                  Bounty
                </th>
                <th className="px-4 py-3 text-zinc-500 text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-zinc-500 text-xs font-medium uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {count > 0
                ? Array.from({ length: count }, (_, i) => i + 1).map((id) => (
                    <BountyRow key={id} bountyId={id} />
                  ))
                : demoRows.map((b, i) => (
                    <tr key={'key' in b ? b.key : `demo-${b.id}`} className="border-b border-border table-row-hover">
                      <td className="px-4 py-3 font-mono text-sm text-zinc-300">{b.id}</td>
                      <td className="px-4 py-3 font-mono text-sm text-zinc-400">
                        <a
                          href={`https://mempool.space/tx/${b.txid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          {formatTxid(b.txid)}
                        </a>
                      </td>
                      <td className="px-4 py-3 font-mono text-sm text-white">{b.amount}</td>
                      <td className="px-4 py-3">
                        <span className="text-emerald-400/90 text-sm">{b.status}</span>
                      </td>
                      <td className="px-4 py-3 text-zinc-500 text-sm">Claim (miner)</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-zinc-500 text-xs mt-3">
        Miners: include the tx in a block, then sign and claim on Hemi. Txids link to{' '}
        <a
          href="https://mempool.space"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          mempool.space
        </a>
        .
      </p>
    </section>
  )
}

function BountyRow({ bountyId }: { bountyId: number }) {
  const { data } = useReadContract({
    address: IS_CONTRACT_DEPLOYED ? CONTRACT_ADDRESS : undefined,
    abi: BOUNTY_ESCROW_ABI,
    functionName: 'getBounty',
    args: [BigInt(bountyId)],
  })
  if (!data) return null
  const [btcTxidHash, amountWei, , , claimed, claimer] = data
  const amountEth = (Number(amountWei) / 1e18).toFixed(4)
  const status = claimed ? 'Claimed' : 'Open'
  const txidShort = btcTxidHash ? `${btcTxidHash.slice(0, 10)}…` : '—'

  return (
    <tr className="border-b border-border table-row-hover">
      <td className="px-4 py-3 font-mono text-sm text-zinc-300">{bountyId}</td>
      <td className="px-4 py-3 font-mono text-sm text-zinc-400">{txidShort}</td>
      <td className="px-4 py-3 font-mono text-sm text-white">{amountEth} ETH</td>
      <td className="px-4 py-3">
        <span className={claimed ? 'text-zinc-500' : 'text-emerald-400/90'}>{status}</span>
      </td>
      <td className="px-4 py-3 font-mono text-xs text-zinc-500">
        {claimed && claimer ? `${claimer.slice(0, 8)}…` : '—'}
      </td>
    </tr>
  )
}

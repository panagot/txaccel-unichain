import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { encodePacked, keccak256 } from 'viem'
import { BOUNTY_ESCROW_ABI } from '../abi'
import { CONTRACT_ADDRESS, IS_CONTRACT_DEPLOYED } from '../config'
import { InfoIcon } from './Tooltip'

const PLACEHOLDER_BOUNTY_ID = '3'
const PLACEHOLDER_BLOCK_HEIGHT = '491650'

export function MinerClaimForm() {
  const { address, isConnected } = useAccount()
  const [bountyId, setBountyId] = useState(PLACEHOLDER_BOUNTY_ID)
  const [blockHeight, setBlockHeight] = useState(PLACEHOLDER_BLOCK_HEIGHT)
  const [recipient, setRecipient] = useState('')
  const [error, setError] = useState('')
  const [demoClaimSuccess, setDemoClaimSuccess] = useState(false)

  const { signMessageAsync } = useSignMessage()
  const { data: hash, writeContract, isPending, error: writeError } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setDemoClaimSuccess(false)
    if (!IS_CONTRACT_DEPLOYED) {
      if (bountyId.trim() && blockHeight.trim()) {
        setDemoClaimSuccess(true)
      } else {
        setError('Enter bounty ID and block height to simulate.')
      }
      return
    }
    const id = BigInt(bountyId)
    const height = BigInt(blockHeight)
    const recipientAddr = (recipient || address) as `0x${string}`
    if (!recipientAddr) {
      setError('Connect wallet or enter recipient address.')
      return
    }

    const messageHash = keccak256(encodePacked(
      ['uint256', 'uint256', 'address'],
      [id, height, recipientAddr]
    ))

    try {
      const sig = await signMessageAsync({
        message: { raw: messageHash as `0x${string}` },
      })
      if (typeof sig !== 'string' || sig.length < 132) {
        setError('Invalid signature')
        return
      }
      const r = (`0x${sig.slice(2, 66)}`) as `0x${string}`
      const s = (`0x${sig.slice(66, 130)}`) as `0x${string}`
      const v = parseInt(sig.slice(130, 132), 16)
      const vAdj = v < 27 ? v + 27 : v

      writeContract({
        address: CONTRACT_ADDRESS,
        abi: BOUNTY_ESCROW_ABI,
        functionName: 'claim',
        args: [id, height, recipientAddr, vAdj, r, s],
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign or claim failed')
    }
  }

  return (
    <section className="bg-surface-900 border border-border rounded-xl p-6 mb-10">
      <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-1.5">
        Claim as miner
        <InfoIcon content="You included the tx in a block. Sign the claim message (bountyId + blockHeight + recipient) and submit to receive the reward. Full flow: For miners." />
      </h2>
      <p className="text-zinc-500 text-sm mb-4">
        You included the tx in a block. Sign the claim message and submit to receive the bounty.{' '}
        <Link to="/for-miners" className="text-accent hover:underline">See For miners</Link> for the full flow.
      </p>
      {!isConnected ? (
        <p className="text-zinc-500 text-sm">
          Connect your wallet to claim a bounty. Miners use this form after including the tx in a block.
        </p>
      ) : (
        <form onSubmit={handleClaim} className="space-y-4 max-w-md">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 text-sm font-medium mb-1.5">Bounty ID</label>
              <input
                type="text"
                value={bountyId}
                onChange={(e) => setBountyId(e.target.value)}
                placeholder="e.g. 3"
                className="w-full font-mono text-sm bg-surface-800 border border-border rounded-lg px-3 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm font-medium mb-1.5">Block height</label>
              <input
                type="text"
                value={blockHeight}
                onChange={(e) => setBlockHeight(e.target.value)}
                placeholder="Bitcoin block"
                className="w-full font-mono text-sm bg-surface-800 border border-border rounded-lg px-3 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>
          <div>
            <label className="block text-zinc-400 text-sm font-medium mb-1.5">Recipient (default: you)</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={address ?? '0x...'}
              className="w-full font-mono text-sm bg-surface-800 border border-border rounded-lg px-3 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          {(error || writeError?.message) && (
            <p className="text-red-400 text-sm">{error || writeError?.message}</p>
          )}
          {isSuccess && <p className="text-emerald-400 text-sm">Claim submitted. Bounty sent to recipient.</p>}
          {demoClaimSuccess && (
            <p className="text-emerald-400 text-sm">Done. With a live contract you’d sign and receive the bounty.</p>
          )}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={IS_CONTRACT_DEPLOYED && (isPending || isConfirming)}
              className="bg-accent hover:bg-accent-muted text-surface-950 font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {IS_CONTRACT_DEPLOYED
                ? (isPending || isConfirming ? 'Confirming…' : 'Sign & claim')
                : 'Try it'}
            </button>
          </div>
        </form>
      )}
    </section>
  )
}

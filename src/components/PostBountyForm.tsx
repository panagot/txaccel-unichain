import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { BOUNTY_ESCROW_ABI } from '../abi'
import { CONTRACT_ADDRESS, IS_CONTRACT_DEPLOYED } from '../config'
import { InfoIcon } from './Tooltip'

type PostBountyFormProps = {
  onSimulatePost?: (txid: string, amount: string, expiryBlock: string) => void
}

export function PostBountyForm({ onSimulatePost }: PostBountyFormProps) {
  const { address, isConnected } = useAccount()
  const [txid, setTxid] = useState('')
  const [expiryBlock, setExpiryBlock] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [demoSuccess, setDemoSuccess] = useState(false)

  const { data: hash, writeContract, isPending, error: writeError } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setDemoSuccess(false)
    if (!txid.trim()) {
      setError('Enter a Bitcoin txid (64-char hex).')
      return
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError('Enter a valid bounty amount.')
      return
    }
    if (!IS_CONTRACT_DEPLOYED) {
      if (onSimulatePost) {
        onSimulatePost(txid.trim(), amount, expiryBlock || '—')
        setDemoSuccess(true)
      } else {
        setError('Deploy the contract and set VITE_BOUNTY_ESCROW_ADDRESS to post bounties.')
      }
      return
    }
    const exp = expiryBlock ? BigInt(expiryBlock) : BigInt(0)
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: BOUNTY_ESCROW_ABI,
        functionName: 'postBounty',
        args: [txid.trim(), exp],
        value: parseEther(amount),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed')
    }
  }

  if (!isConnected) {
    return (
      <section className="bg-surface-900 border border-border rounded-xl p-6 mb-10">
        <h2 className="text-lg font-semibold text-white mb-2">Post a bounty</h2>
        <p className="text-zinc-500 text-sm">
          Connect your wallet to post a bounty for a Bitcoin transaction.
        </p>
      </section>
    )
  }

  return (
    <section className="bg-surface-900 border border-border rounded-xl p-6 mb-10">
      <h2 className="text-lg font-semibold text-white mb-4">Post a bounty</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-zinc-400 text-sm font-medium mb-1.5 flex items-center gap-1.5">
            Bitcoin txid (hex)
            <InfoIcon content="64-character hex transaction ID from the Bitcoin network. Find it on mempool.space or your wallet." />
          </label>
          <input
            type="text"
            value={txid}
            onChange={(e) => setTxid(e.target.value)}
            placeholder="e.g. abc123..."
            className="w-full font-mono text-sm bg-surface-800 border border-border rounded-lg px-3 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-400 text-sm font-medium mb-1.5">
              Bounty (ETH)
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.01"
              className="w-full font-mono text-sm bg-surface-800 border border-border rounded-lg px-3 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm font-medium mb-1.5 flex items-center gap-1.5">
              Expiry block (optional)
              <InfoIcon content="Bitcoin block height after which you can refund the bounty if no one has claimed." />
            </label>
            <input
              type="text"
              value={expiryBlock}
              onChange={(e) => setExpiryBlock(e.target.value)}
              placeholder="Bitcoin block height"
              className="w-full font-mono text-sm bg-surface-800 border border-border rounded-lg px-3 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            />
          </div>
        </div>
        {(error || writeError?.message) && (
          <p className="text-red-400 text-sm">{error || writeError?.message}</p>
        )}
        {isSuccess && (
          <p className="text-emerald-400 text-sm">Bounty posted. Refresh to see it in the list.</p>
        )}
        {demoSuccess && (
          <p className="text-emerald-400 text-sm">Demo: bounty added to the table below. (No contract — simulation only.)</p>
        )}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isPending || isConfirming}
            className="bg-accent hover:bg-accent-muted text-surface-950 font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {IS_CONTRACT_DEPLOYED
              ? (isPending || isConfirming ? 'Confirming…' : 'Post bounty')
              : onSimulatePost
                ? 'Simulate post (demo)'
                : 'Post bounty'}
          </button>
          {!IS_CONTRACT_DEPLOYED && onSimulatePost && (
            <span className="text-zinc-500 text-xs">No contract deployed — simulating for demo</span>
          )}
        </div>
      </form>
    </section>
  )
}

export function ValueProp() {
  return (
    <section className="mb-12 py-8 px-6 rounded-xl border border-border bg-surface-900/50">
      <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
        Why TxAccel
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <p className="text-white font-medium mb-1">Discovery</p>
          <p className="text-zinc-400 text-sm">
            One board for open bounties. Miners see txids and rewards; users see their bounty live.
          </p>
        </div>
        <div>
          <p className="text-white font-medium mb-1">Trustless</p>
          <p className="text-zinc-400 text-sm">
            Funds locked in contract. Payout only after valid claim (signature → verify → release).
          </p>
        </div>
        <div>
          <p className="text-white font-medium mb-1">Hemi-native</p>
          <p className="text-zinc-400 text-sm">
            Designed for hBK: on mainnet, verify Bitcoin tx inclusion and miner via coinbase.
          </p>
        </div>
      </div>
    </section>
  )
}

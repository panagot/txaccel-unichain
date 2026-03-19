// Set this to your deployed BountyEscrow contract address on Unichain Sepolia or Unichain mainnet.
const ZERO = '0x0000000000000000000000000000000000000000' as const
export const CONTRACT_ADDRESS =
  (import.meta.env.VITE_BOUNTY_ESCROW_ADDRESS as `0x${string}` | undefined) || ZERO
export const IS_CONTRACT_DEPLOYED = CONTRACT_ADDRESS !== ZERO

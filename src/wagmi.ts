import { http, createConfig } from 'wagmi'
import { defineChain } from 'viem'

/** Unichain mainnet — see https://docs.unichain.org/docs/technical-information/network-information */
export const unichain = defineChain({
  id: 130,
  name: 'Unichain',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://mainnet.unichain.org'] },
  },
  blockExplorers: {
    default: { name: 'Uniscan', url: 'https://uniscan.xyz' },
  },
})

export const unichainSepolia = defineChain({
  id: 1301,
  name: 'Unichain Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://sepolia.unichain.org'] },
  },
  blockExplorers: {
    default: { name: 'Uniscan Sepolia', url: 'https://sepolia.uniscan.xyz' },
  },
  testnet: true,
})

export const config = createConfig({
  chains: [unichainSepolia, unichain],
  transports: {
    [unichain.id]: http(),
    [unichainSepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

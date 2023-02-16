import { ChainId } from 'enums';

export const ChainNames: Record<ChainId, string> = {
  [ChainId.MAINNET]: 'Ethereum Mainnet',
  [ChainId.GOERLI]: 'Goerli Testnet',
  [ChainId.ARBITRUM]: 'Arbitrum Goerli',
  [ChainId.MUMBAI]: 'Polygon Mumbai',
  [ChainId.OPTIMISM]: 'Optimism Goerli'
};

export const providerUrls: Record<ChainId, string> = {
  [ChainId.MAINNET]: '',
  [ChainId.OPTIMISM]: 'https://opt-goerli.g.alchemy.com/v2/ZIZkXJUsv7NZ0UkYgtXhVT3IikhTqjNq',
  [ChainId.GOERLI]: 'https://goerli.infura.io/v3/2a03dbc0d02945709182ed26b52cffd5',
  [ChainId.MUMBAI]: 'https://polygon-mumbai.g.alchemy.com/v2/LWVjQQnv7tndzlugPWpFMDxDG--F7NYH',
  [ChainId.ARBITRUM]: 'https://arb-goerli.g.alchemy.com/v2/4roOugVBSjCuI0vXsAWVR4c__GN40Z0v'
}

export const DEFAULT_CHAIN_IDS: ChainId[] = [ChainId.GOERLI, ChainId.ARBITRUM, ChainId.MUMBAI, ChainId.OPTIMISM];

export const INFURA_GOERLI_HTTP_URL = process.env.NEXT_PUBLIC_INFURA_GOERLI_URI as string;
export const INFURA_MAINNET_HTTP_URL = process.env.NEXT_PUBLIC_INFURA_MAINNET_URI as string;

import { ChainId } from 'enums';

export const ChainNames: Record<ChainId, string> = {
  [ChainId.MAINNET]: 'Ethereum Mainnet',
  [ChainId.GOERLI]: 'Goerli Testnet',
  [ChainId.ARBITRUM]: 'Arbitrum Goerli',
  [ChainId.MUMBAI]: 'Polygon Mumbai',
  [ChainId.OPTIMISM]: 'Optimism Goerli'
};

export const DEFAULT_CHAIN_IDS: ChainId[] = [ChainId.GOERLI, ChainId.ARBITRUM, ChainId.MUMBAI, ChainId.OPTIMISM];

export const INFURA_GOERLI_HTTP_URL = process.env.NEXT_PUBLIC_INFURA_GOERLI_URI as string;
export const INFURA_MAINNET_HTTP_URL = process.env.NEXT_PUBLIC_INFURA_MAINNET_URI as string;

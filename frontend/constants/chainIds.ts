import { ChainId } from 'enums';

export const ChainNames: Record<ChainId, string> = {
  [ChainId.MAINNET]: 'Ethereum Mainnet',
  [ChainId.GOERLI]: 'Goerli Testnet'
};

export const DEFAULT_CHAIN_IDS: ChainId[] = [ChainId.MAINNET, ChainId.GOERLI];

export const INFURA_GOERLI_HTTP_URL = process.env.NEXT_PUBLIC_INFURA_GOERLI_URI as string;
export const INFURA_MAINNET_HTTP_URL = process.env.NEXT_PUBLIC_INFURA_MAINNET_URI as string;

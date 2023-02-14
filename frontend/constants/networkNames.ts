import { ChainId, NetworkName } from 'enums';
import { ChainNames } from './chainIds';

export const DEFAULT_NETWORK_NAMES: NetworkName[] = [NetworkName.MAINNET, NetworkName.GOERLI];

export const ChainNameFromNetworkName: Record<NetworkName, string> = {
  [NetworkName.MAINNET]: ChainNames[ChainId.MAINNET],
  [NetworkName.GOERLI]: ChainNames[ChainId.GOERLI]
};

export const SUPPORTED_NETWORK: NetworkName = NetworkName[process.env.NEXT_PUBLIC_SUPPORTED_NETWORK];
export const APP_REDIRECT_NETWORK: NetworkName = NetworkName[process.env.NEXT_PUBLIC_APP_REDIRECT_NETWORK];

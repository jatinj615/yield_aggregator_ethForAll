import { SUPPORTED_NETWORK } from 'constants/networkNames';

const ETHERSCAN_PREFIXES = {
  homestead: '',
  goerli: 'goerli.'
};

export enum ExplorerDataType {
  TRANSACTION = 'transaction',
  TOKEN = 'token',
  ADDRESS = 'address',
  BLOCK = 'block'
}

export function getExplorerLink(data: string, type: ExplorerDataType): string {
  const prefix = `https://${ETHERSCAN_PREFIXES[SUPPORTED_NETWORK]}etherscan.io`;

  switch (type) {
    case ExplorerDataType.TRANSACTION: {
      return `${prefix}/tx/${data}`;
    }
    case ExplorerDataType.TOKEN: {
      return `${prefix}/token/${data}`;
    }
    case ExplorerDataType.BLOCK: {
      return `${prefix}/block/${data}`;
    }
    case ExplorerDataType.ADDRESS:
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

export * from './calc';
export * from './formatNumber';
export * from './getBalances';
export * from './getDepositCardData';
export * from './getPoolCardData';
export * from './getCoinGecko';
export * from './getAaveData';
export * from './getEthereumProviderLibrary';
export * from './storage';
export * from './getPoolInternalData';

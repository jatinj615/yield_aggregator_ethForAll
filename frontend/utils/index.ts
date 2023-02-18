import { SUPPORTED_NETWORKS } from 'constants/networkNames';
import {explorers} from './multiChainConstants';

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

export function getExplorerLink(data: string, type: ExplorerDataType, chainId: number): string {
  const prefix = `https://${explorers[chainId]}`;

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

export const escapeRegExp = (value: string): string => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

export const isIncorrectNumberFormat = (param) => {
  const format = /[!@#$%^&*()_+\-=e\[\]{};':"\\|,<>\/?]+/;
  return format.test(param);
};

export * from './formatNumber';
export * from './getDepositCardData';
export * from './getCoinGecko';
export * from './getAaveData';
export * from './getEthereumProviderLibrary';
export * from './storage';

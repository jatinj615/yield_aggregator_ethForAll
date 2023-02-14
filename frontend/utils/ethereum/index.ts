import { getAddress } from 'ethers/lib/utils';

export * from './walletConnectors';

export function formatWalletAddress(account: string): string {
  return `${account.slice(0, 7)}...${account.slice(-5)}`;
}

export function isValidAddress(address: string): boolean {
  try {
    const convertedAddress = getAddress(address);
    return !!convertedAddress;
  } catch (e) {
    return false;
  }
}

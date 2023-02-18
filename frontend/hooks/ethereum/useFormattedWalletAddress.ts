import { Provider } from '@ethersproject/providers';
import { formatWalletAddress, isValidAddress } from 'utils/ethereum';

export function useFormattedWalletAddress(
  accountOrEnsName: string | null | undefined,
  provider?: Provider
): string | null | undefined {
  if (!accountOrEnsName || !isValidAddress(accountOrEnsName)) {
    return accountOrEnsName;
  } else {
    return formatWalletAddress(accountOrEnsName);
  }
}

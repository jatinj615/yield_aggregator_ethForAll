import { ethers, Signer } from 'ethers';
import { BigNumber, ZERO, ONE, bnum } from './poolCalc/utils/bignumber';
import { numberConstants } from './constants';
import { intlFormatNumber } from 'utils/formatNumber';
import { CurrencyId, CurrencySymbol } from 'enums';

export const calculateAaveAPY = (liquidityRate) => {
  const depositAPR = bnum(liquidityRate).div(numberConstants.RAY);
  return depositAPR
    .div(numberConstants.secondsPerYear)
    .plus(ONE)
    .pow(numberConstants.secondsPerYear)
    .minus(ONE)
    .multipliedBy(100);
};

export const getConversionRate = (rate, symbol) => {
  const currencySymbol = CurrencySymbol[symbol?.toUpperCase()];
  const currencyId = CurrencyId[currencySymbol];
  return currencyId ? rate?.[currencyId]?.[CurrencyId.USD] : 0;
};

export const getVaultApy = (vaultApy: ethers.BigNumber | number, duration: string): string => {
  switch (duration) {
    case 'YEARLY':
      return `${intlFormatNumber(
        bnum(typeof vaultApy === 'number' ? vaultApy : ethers.utils.formatEther(vaultApy ?? 0))
          .dp(3, 1)
          .multipliedBy(100)
          .toString(),
        3
      )} %`;
    case 'MONTHLY':
      return `${intlFormatNumber(
        bnum(typeof vaultApy === 'number' ? vaultApy : ethers.utils.formatEther(vaultApy ?? 0))
          .dp(3, 1)
          .multipliedBy(100)
          .div(numberConstants.monthsPerYear)
          .dp(3, 1)
          .toString(),
        3
      )} %`;
    case 'DAILY':
      return `${intlFormatNumber(
        bnum(typeof vaultApy === 'number' ? vaultApy : ethers.utils.formatEther(vaultApy ?? 0))
          .dp(3, 1)
          .multipliedBy(100)
          .div(numberConstants.daysPerYear)
          .dp(3, 1)
          .toString(),
        3
      )} %`;
    default:
      return '';
  }
};

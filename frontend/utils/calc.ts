import { ethers, Signer } from 'ethers';
import moment from 'moment';
import { BigNumber, ZERO, ONE, bnum } from './poolCalc/utils/bignumber';
import { numberConstants } from './constants';
import futureBase from 'hooks/contracts/FutureBase';
import { intlFormatNumber } from 'utils/formatNumber';

import { WeightedPoolPairData, WeightedPool } from './poolCalc/weightedPool/weightedPool';
import { UnrealPoolPairData, UnrealPool } from './poolCalc/ccPool/ccPool';
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

export const calculateCompoundAPY = (supplyRate) => {
  return bnum(supplyRate)
    .div(numberConstants.ethMantissa)
    .multipliedBy(numberConstants.blocksPerDay)
    .plus(ONE)
    .pow(numberConstants.daysPerYear)
    .minus(ONE)
    .multipliedBy(100);
};

// TODO: Fix this method
export const parsePoolData = (poolData) => {
  if (poolData.poolType === 'Unreal') {
    const pool = new UnrealPool(
      poolData.id,
      poolData.address,
      poolData.swapFee,
      poolData.totalShares,
      poolData.tokens,
      poolData.tokensList,
      poolData.expiryTime,
      poolData.unitSeconds,
      poolData.principalToken,
      poolData.baseToken
    );
    pool.setCurrentBlockTimestamp(Math.floor(Date.now() / 1000));
    return pool;
  } else {
    const pool = new WeightedPool(
      poolData.id,
      poolData.address,
      poolData.swapFee,
      poolData.totalWeight,
      poolData.totalShares,
      poolData.tokens,
      poolData.tokensList
    );
    return pool;
  }
};

// TODO: Remove this
export const getAccInterest = (accInterest, conversionRate) => {
  return bnum(accInterest).multipliedBy(conversionRate);
};

/**
 * To calculate and return fixed APR
 *
 * @dev Formula : convergingPointConstant / timeStretch
 * @param timeStretch
 * @returns {BigNumber} fixedAPR
 */
export const calcOtFixedAPR = (timeStretch) => {
  return numberConstants.convergingPointConstant.div(timeStretch);
};

/**
 * To calculate the price of yt
 *
 * @param ytToken yt token from balancer
 * @param underlyingToken underlying token for the corresponding yt pool from balancer
 * @returns {BigNumber} price of yt
 */
export const getYtPrice = (ytToken, underlyingToken) => {
  const yieldPrice =
    ytToken && underlyingToken && Number(ytToken?.balance) > 0
      ? bnum(underlyingToken?.balance).div(ytToken?.balance)
      : ZERO;

  return yieldPrice;
};

/**
 * To calculate and return fixed APR
 *
 * @dev Formula : 1 / Math.pow(1 + apr / 100, remainingDays / 365)
 * @param fixedapr
 * @param startTimestamp
 * @param durationSeconds
 * @returns {BigNumber} principalPrice
 */
export const getOtPrice = (fixedapr, startTimestamp, durationSeconds): BigNumber => {
  const endDate = moment.unix(parseInt(startTimestamp, 10) + parseInt(durationSeconds, 10));
  const currentDate = moment.unix(moment().unix());
  const remainingDays = endDate.diff(currentDate, 'days');

  return bnum(
    Math.pow(ONE.plus(fixedapr.div(100)).toNumber(), bnum(remainingDays).div(numberConstants.daysPerYear).toNumber())
  ).pow(-1);
};

export const getConversionRate = (rate, symbol) => {
  const currencySymbol = CurrencySymbol[symbol?.toUpperCase()];
  const currencyId = CurrencyId[currencySymbol];
  return currencyId ? rate?.[currencyId]?.[CurrencyId.USD] : 0;
};

/**
 * To calculate and return principal liquidity
 *
 * @param otToken ot token from balancer
 * @param underlyingToken underlying token of the corresponding pool from balancer
 * @param otPrice price of 1 ot
 * @param conversionRate price of underlying in dollars
 * @returns {BigNumber} principalLiquidity
 */
export const getOtPoolLiquidity = (otToken, underlyingToken, otPrice, conversionRate): BigNumber => {
  let principalLiquidity = ZERO;

  if (otToken && underlyingToken) {
    principalLiquidity = otPrice
      .multipliedBy(otToken?.balance)
      .plus(bnum(underlyingToken?.balance).multipliedBy(conversionRate));
  }

  return principalLiquidity;
};

/**
 * To calculate and return yield liquidity
 *
 * @Dev Formula : Weighted pool
 * @param ytToken
 * @param underlyingToken
 * @param ytPrice
 * @param conversionRate
 * @returns {BigNumber} yieldLiquidity
 */
export const getYtPoolLiquidity = (ytToken, underlyingToken, ytPrice, conversionRate): BigNumber => {
  let yieldLiquidity = ZERO;

  if (ytToken && underlyingToken) {
    yieldLiquidity = ytPrice
      .multipliedBy(ytToken?.balance)
      .plus(bnum(underlyingToken?.balance).multipliedBy(conversionRate));
  }

  return yieldLiquidity;
};

/**
 * To calculate and return yield LP APY
 *
 * @param ytPoolLiquidity
 * @param totalSwapFee
 * @returns {BigNumber} yieldLPAPY
 */
export const calcYtLPAPY = (ytPoolLiquidity, totalSwapFee): BigNumber => {
  if (totalSwapFee && Number(ytPoolLiquidity)) {
    return bnum(totalSwapFee).dividedBy(ytPoolLiquidity).multipliedBy(numberConstants.daysPerYear);
  }

  return ZERO;
};

/**
 * To calculate and return yield LP APY
 *
 * @param otPoolTokens
 * @param underlyingAddress
 * @param timeStretch
 * @param startTimestamp
 * @param durationSeconds
 * @param rate
 * @param otSymbol
 * @param totalSwapFee
 * @returns {BigNumber} principalLPAPY
 */
export const calcOtLPAPY = (otPoolLiquidity, totalSwapFee): BigNumber => {
  if (totalSwapFee && Number(otPoolLiquidity)) {
    return bnum(totalSwapFee).dividedBy(otPoolLiquidity).multipliedBy(numberConstants.daysPerYear);
  }

  return ZERO;
};

export const getTimeRemaining = (startBlock: any, durationSeconds: any) => {
  const diff = parseInt(moment().unix().toString(), 10) - startBlock;
  const duration = durationSeconds;
  if (diff > duration) return 100;
  return Math.floor((diff / duration) * 100);
};

export const calcEndDate = (startTimestamp: any, durationSeconds: any) => {
  return moment.unix(parseInt(startTimestamp, 10) + parseInt(durationSeconds, 10)).format('MMM DD, YYYY');
};

export const isIncorrectNumberFormat = (param) => {
  const format = /[!@#$%^&*()_+\-=e\[\]{};':"\\|,<>\/?]+/;
  return format.test(param);
};

export const escapeRegExp = (value: string): string => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

export const getEnumKeyByEnumValue = (myEnum, enumValue): string => {
  return Object.keys(myEnum).find((x) => myEnum[x] == enumValue);
};

// TODO: Remove this (Declare once)
export const calcRemainingDaysFromBlock = (startTimestamp: any, durationSeconds: any) => {
  return moment.unix(parseInt(startTimestamp, 10) + parseInt(durationSeconds, 10)).fromNow();
};

export const getAPR = (apr: BigNumber, duration: string): string => {
  switch (duration) {
    case 'YEARLY':
      return `${intlFormatNumber(apr.dp(2, 1).toString(), 2)} %`;
    case 'MONTHLY':
      return `${intlFormatNumber(apr.div(numberConstants.monthsPerYear).dp(2, 1).toString(), 2)} %`;
    case 'DAILY':
      return `${intlFormatNumber(apr.div(numberConstants.daysPerYear).dp(2, 1).toString(), 2)} %`;
    default:
      return '';
  }
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

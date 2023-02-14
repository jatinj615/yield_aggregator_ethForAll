// * get aggregate pool card data
import { forEach, map } from 'lodash-es';
import {
  getTimeRemaining,
  calcRemainingDaysFromBlock,
  calcOtFixedAPR,
  calcYtLPAPY,
  calcOtLPAPY,
  calcEndDate,
  getOtPoolLiquidity,
  getYtPoolLiquidity,
  getOtPrice,
  getYtPrice,
  getConversionRate
} from './calc';
import { Protocol } from 'enums';

interface IObject {
  [key: string]: any;
}

export const getPoolCardData = ({
  unrealEpochs,
  dataPoolStats,
  aaveAPYData,
  compoundAPYData,
  yearnAPYData,
  kovanPoolData,
  rate
}) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // * get the pool card data
    try {
      const otData = map(dataPoolStats?.otpools, (pool: any) => {
        const unrealEpoch = unrealEpochs[kovanPoolData[pool?.id?.toLowerCase()]?.address?.toLowerCase()];
        let vaultApy;
        if (Protocol.AAVEV3 === Protocol[unrealEpoch?.stream?.protocol]) {
          vaultApy = aaveAPYData[unrealEpoch?.stream?.underlying];
        } else if (Protocol.COMP === Protocol[unrealEpoch?.stream?.protocol]) {
          vaultApy = compoundAPYData[unrealEpoch?.stream?.underlying];
        } else if (Protocol.YEARN === Protocol[unrealEpoch?.stream?.protocol]) {
          vaultApy = yearnAPYData[unrealEpoch?.stream?.underlying];
        }
        return createOTRowObject(pool, vaultApy, unrealEpochs, kovanPoolData, rate);
      });

      const ytData = map(dataPoolStats?.ytpools, (pool: any) => {
        const unrealEpoch = unrealEpochs[kovanPoolData[pool?.id?.toLowerCase()]?.address?.toLowerCase()];
        let vaultApy;
        if (Protocol.AAVEV3 === Protocol[unrealEpoch?.stream?.protocol]) {
          vaultApy = aaveAPYData[unrealEpoch?.stream?.underlying];
        } else if (Protocol.COMP === Protocol[unrealEpoch?.stream?.protocol]) {
          vaultApy = compoundAPYData[unrealEpoch?.stream?.underlying];
        } else if (Protocol.YEARN === Protocol[unrealEpoch?.stream?.protocol]) {
          vaultApy = yearnAPYData[unrealEpoch?.stream?.underlying];
        }
        return createYTRowObject(pool, vaultApy, unrealEpochs, kovanPoolData, rate);
      });

      // * return the values
      resolve({ otData, ytData });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * To create OT row object
 * @param pool
 * @param vaultApy
 * @param unrealEpochs
 * @param kovanPoolData
 * @param rate
 * @returns otRowObject
 */
const createOTRowObject = (pool, vaultApy, unrealEpochs, kovanPoolData, rate) => {
  const otRowObject: IObject = {};

  const unrealEpoch = unrealEpochs[kovanPoolData[pool?.id?.toLowerCase()]?.address?.toLowerCase()];
  const ownershipToken =
    pool?.tokens?.[0]?.address?.toLowerCase() !== unrealEpoch?.stream?.underlying?.toLowerCase()
      ? pool?.tokens?.[0]
      : pool?.tokens?.[1];
  const otUnderlying =
    pool?.tokens?.[0]?.address?.toLowerCase() === ownershipToken?.address?.toLowerCase()
      ? pool?.tokens?.[1]
      : pool?.tokens?.[0];
  const conversionRate = getConversionRate(rate, otUnderlying?.symbol);

  otRowObject.id = pool?.address;
  otRowObject.poolId = pool?.id;
  otRowObject.key = pool?.address;
  otRowObject.underlyingTokenSymbol = otUnderlying?.symbol;
  otRowObject.poolTokenSymbol = ownershipToken?.symbol;
  otRowObject.underlyingDecimals = otUnderlying.decimals;
  otRowObject.otFixedAPR = calcOtFixedAPR(kovanPoolData[pool?.id]?.otPool?.timeStretch);
  otRowObject.epochAddress = unrealEpoch?.address;
  otRowObject.durationSeconds = unrealEpoch?.stream?.durationSeconds;
  otRowObject.startTimestamp = unrealEpoch?.startTimestamp;
  otRowObject.vaultApy = vaultApy;

  otRowObject.otPrice = getOtPrice(
    otRowObject.otFixedAPR,
    unrealEpoch?.startTimestamp,
    unrealEpoch?.stream?.durationSeconds
  ).multipliedBy(conversionRate);

  otRowObject.otPoolLiquidity = getOtPoolLiquidity(ownershipToken, otUnderlying, otRowObject.otPrice, conversionRate);

  otRowObject.lpApyOt = calcOtLPAPY(otRowObject.otPoolLiquidity, pool?.totalSwapFee);

  otRowObject.endDate = calcEndDate(unrealEpoch?.startTimestamp, unrealEpoch?.stream?.durationSeconds);

  otRowObject.duration = calcRemainingDaysFromBlock(unrealEpoch?.startTimestamp, unrealEpoch?.stream?.durationSeconds);

  otRowObject.percentComplete = getTimeRemaining(unrealEpoch?.startTimestamp, unrealEpoch?.stream?.durationSeconds);

  return otRowObject;
};

/**
 * To create YT row object
 * @param pool
 * @param vaultApy
 * @param unrealEpochs
 * @param kovanPoolData
 * @param rate
 * @returns ytRowObject
 */
const createYTRowObject = (pool, vaultApy, unrealEpochs, kovanPoolData, rate) => {
  const ytRowObject: IObject = {};

  const unrealEpoch = unrealEpochs[kovanPoolData[pool?.id?.toLowerCase()]?.address?.toLowerCase()];
  const yieldToken =
    pool?.tokens?.[0]?.address?.toLowerCase() !== unrealEpoch?.stream?.underlying?.toLowerCase()
      ? pool?.tokens?.[0]
      : pool?.tokens?.[1];
  const ytUnderlying =
    pool?.tokens?.[0]?.address?.toLowerCase() === yieldToken?.address?.toLowerCase()
      ? pool?.tokens?.[1]
      : pool?.tokens?.[0];
  const conversionRate = getConversionRate(rate, ytUnderlying?.symbol);

  ytRowObject.id = pool?.address;
  ytRowObject.poolId = pool?.id;
  ytRowObject.key = pool?.address;
  ytRowObject.underlyingTokenSymbol = ytUnderlying?.symbol;
  ytRowObject.poolTokenSymbol = yieldToken?.symbol;
  ytRowObject.underlyingDecimals = ytUnderlying.decimals;
  ytRowObject.otFixedAPR = calcOtFixedAPR(kovanPoolData[pool?.id]?.otPool?.timeStretch);
  ytRowObject.epochAddress = unrealEpoch?.address;
  ytRowObject.durationSeconds = unrealEpoch?.stream?.durationSeconds;
  ytRowObject.startTimestamp = unrealEpoch?.startTimestamp;
  ytRowObject.vaultApy = vaultApy;

  ytRowObject.ytPrice = getYtPrice(yieldToken, ytUnderlying).multipliedBy(conversionRate);

  ytRowObject.ytPoolLiquidity = getYtPoolLiquidity(yieldToken, ytUnderlying, ytRowObject.ytPrice, conversionRate);

  ytRowObject.lpApyYt = calcYtLPAPY(ytRowObject.ytPoolLiquidity, pool?.totalSwapFee);

  ytRowObject.endDate = calcEndDate(unrealEpoch?.startTimestamp, unrealEpoch?.stream?.durationSeconds);

  ytRowObject.duration = calcRemainingDaysFromBlock(unrealEpoch?.startTimestamp, unrealEpoch?.stream?.durationSeconds);

  ytRowObject.percentComplete = getTimeRemaining(unrealEpoch?.startTimestamp, unrealEpoch?.stream?.durationSeconds);

  return ytRowObject;
};

// * get aggregate deposit card data
import { map } from 'lodash-es';
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

export const getDepositCardData = ({
  balancerPools,
  dataAllActiveStreams,
  aaveAPYData,
  compoundAPYData,
  yearnAPYData,
  kovanPoolData,
  rate
}) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // * get the deposit card data
    try {
      const depositCardData = map(dataAllActiveStreams, (stream: any) => {
        let vaultApy;
        if (Protocol.AAVEV3 === Protocol[stream?.protocol]) {
          vaultApy = aaveAPYData[stream?.underlying];
        } else if (Protocol.COMP === Protocol[stream?.protocol]) {
          vaultApy = compoundAPYData[stream?.underlying];
        } else if (Protocol.YEARN === Protocol[stream?.protocol]) {
          vaultApy = yearnAPYData[stream?.underlying];
        }
        return createMintRowObject(stream, vaultApy, balancerPools, kovanPoolData, rate);
      });

      // * return the values
      resolve(depositCardData);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * To create mint row object
 * @param stream
 * @param vaultApy
 * @param balancerPools
 * @param kovanPoolData
 * @param rate
 * @returns mintRowObject
 */
const createMintRowObject = (stream, vaultApy, balancerPools, kovanPoolData, rate) => {
  const mintRowObject: IObject = {};

  const ytPool = balancerPools[kovanPoolData[stream?.currentEpoch?.address.toLowerCase()]?.ytPool?.poolId];
  const otPool = balancerPools[kovanPoolData[stream?.currentEpoch?.address.toLowerCase()]?.otPool?.poolId];
  const ytUnderlying =
    ytPool?.tokens?.[0]?.address.toLowerCase() === stream?.underlying.toLowerCase()
      ? ytPool?.tokens?.[0]
      : ytPool?.tokens?.[1];
  const yieldToken =
    ytPool?.tokens?.[0]?.address.toLowerCase() === ytUnderlying?.address.toLowerCase()
      ? ytPool?.tokens?.[1]
      : ytPool?.tokens?.[0];
  const conversionRate = getConversionRate(rate, ytUnderlying?.symbol);
  const otUnderlying =
    otPool?.tokens?.[0]?.address.toLowerCase() === stream?.underlying.toLowerCase()
      ? otPool?.tokens?.[0]
      : otPool?.tokens?.[1];
  const ownershipToken =
    otPool?.tokens?.[0]?.address.toLowerCase() === otUnderlying?.address.toLowerCase()
      ? otPool?.tokens?.[1]
      : otPool?.tokens?.[0];

  mintRowObject.id = stream?.id;
  mintRowObject.otSymbol = stream?.currentEpoch?.otToken?.symbol;
  mintRowObject.ytSymbol = stream?.currentEpoch?.yieldToken?.symbol;
  mintRowObject.durationSeconds = stream?.durationSeconds;
  mintRowObject.meta = stream?.meta;
  mintRowObject.tvl = stream?.currentEpoch?.tvl;
  mintRowObject.key = stream?.id;
  mintRowObject.epochAddress = stream?.currentEpoch?.address;
  mintRowObject.otAddress = stream?.currentEpoch?.otToken?.address;
  mintRowObject.ytAddress = stream?.currentEpoch?.yieldToken?.address;
  mintRowObject.protocol = stream?.protocol;
  mintRowObject.name = stream?.tokenSymbol;
  mintRowObject.underlying = stream?.underlying;
  mintRowObject.startTimestamp = stream?.currentEpoch?.startTimestamp;
  mintRowObject.streamKey = stream?.id;
  mintRowObject.vaultApy = vaultApy;
  mintRowObject.underlyingDecimals = stream?.underlyingDecimals;

  mintRowObject.otFixedAPR = calcOtFixedAPR(
    kovanPoolData[stream?.currentEpoch?.address.toLowerCase()]?.otPool?.timeStretch
  );

  mintRowObject.otPrice = getOtPrice(
    mintRowObject.otFixedAPR,
    stream?.currentEpoch?.startTimestamp,
    stream?.durationSeconds
  );

  mintRowObject.ytPrice = getYtPrice(yieldToken, ytUnderlying);

  mintRowObject.otPoolLiquidity = getOtPoolLiquidity(
    ownershipToken,
    otUnderlying,
    mintRowObject.otPrice,
    conversionRate
  );

  mintRowObject.ytPoolLiquidity = getYtPoolLiquidity(yieldToken, ytUnderlying, mintRowObject.ytPrice, conversionRate);

  mintRowObject.lpApyOt = calcOtLPAPY(mintRowObject.otPoolLiquidity, otPool?.totalSwapFee);

  mintRowObject.lpApyYt = calcYtLPAPY(mintRowObject.ytPoolLiquidity, ytPool?.totalSwapFee);

  mintRowObject.vault = stream?.currentEpoch?.interestBearingSymbol;

  mintRowObject.duration = calcRemainingDaysFromBlock(stream?.currentEpoch?.startTimestamp, stream?.durationSeconds);

  mintRowObject.percentComplete = getTimeRemaining(stream?.currentEpoch?.startTimestamp, stream?.durationSeconds);

  mintRowObject.endDate = calcEndDate(stream?.currentEpoch?.startTimestamp, stream?.durationSeconds);

  return mintRowObject;
};

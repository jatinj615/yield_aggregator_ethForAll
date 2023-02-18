// libs
import moment from 'moment';
import { forEachRight } from 'lodash-es';
import { chain } from './lodash';

// utils
import {
  calcOtFixedAPR,
  getConversionRate,
  getIntegerFromString,
  getOtPrice,
  getYtPrice,
  getOtPoolLiquidity,
  getYtPoolLiquidity
} from 'utils';
import { bnum, BigNumber, ZERO } from 'utils/poolCalc/utils/bignumber';

interface IObject {
  [key: string]: any;
}

export const getPoolInternalData = ({
  dataPoolDetails,
  dataEpochDetails,
  kovanPoolData,
  poolId,
  rate,
  swapTransactionsData,
  liquidityTransactionsData,
  dataPastPools
}) => {
  const poolObject: IObject = {};
  const liquidityPastPools: IObject[] = [];
  const volumePastPools: IObject[] = [];

  poolObject.pool = dataPoolDetails?.pools?.[0];
  poolObject.epoch = dataEpochDetails?.epoches?.[0];
  poolObject.poolToken =
    poolObject.pool?.tokens?.[0]?.address?.toLowerCase() !== poolObject.epoch?.stream?.underlying.toLowerCase()
      ? poolObject.pool?.tokens?.[0]
      : poolObject.pool?.tokens?.[1];
  poolObject.underlyingToken =
    poolObject.pool?.tokens?.[0]?.address?.toLowerCase() === poolObject.poolToken?.address.toLowerCase()
      ? poolObject.pool?.tokens?.[1]
      : poolObject.pool?.tokens?.[0];
  poolObject.conversionRate = getConversionRate(rate, poolObject.underlyingToken?.symbol);
  // poolObject.isOwnershipPool = poolObject.pool?.poolType === 'Unreal';
  poolObject.isOwnershipPool =
    poolObject.pool?.id === kovanPoolData[poolId?.toString().toLowerCase()].otPool.poolId.toLowerCase();

  const swapsData = chain(swapTransactionsData)
    .orderBy([(swapTx: any) => swapTx?.timestamp], ['desc'])
    .map((swapTx: any) => {
      const swapsRowObject: IObject = {};
      let amount, tokenInSymbol, tokenOutSymbol;
      if (poolObject.underlyingToken?.address?.toLowerCase() === swapTx?.tokenIn?.toLowerCase()) {
        amount = swapTx?.tokenAmountIn;
        tokenInSymbol = poolObject.underlyingToken?.symbol;
        tokenOutSymbol = poolObject.epoch?.interestBearingSymbol;
      } else if (poolObject.underlyingToken?.address?.toLowerCase() === swapTx?.tokenOut?.toLowerCase()) {
        amount = swapTx?.tokenAmountOut;
        tokenInSymbol = poolObject.epoch?.interestBearingSymbol;
        tokenOutSymbol = poolObject.underlyingToken?.symbol;
      }
      swapsRowObject.tokenInSymbol = tokenInSymbol;
      swapsRowObject.tokenOutSymbol = tokenOutSymbol;

      swapsRowObject.id = swapTx?.id;
      swapsRowObject.tx = swapTx?.tx;
      swapsRowObject.value = bnum(amount).multipliedBy(poolObject.conversionRate);
      swapsRowObject.tokenInAddress = swapTx?.tokenIn;
      swapsRowObject.tokenInAmount = swapTx?.tokenAmountIn;
      swapsRowObject.tokenInName = swapTx?.tokenInSym;
      swapsRowObject.tokenOutAddress = swapTx?.tokenOut;
      swapsRowObject.tokenOutAmount = swapTx?.tokenAmountOut;
      swapsRowObject.tokenOutName = swapTx?.tokenOutSym;
      swapsRowObject.endDate = moment.unix(parseInt(swapTx?.timestamp, 10)).fromNow();

      return swapsRowObject;
    })
    .value();

  const liquidityData = chain(liquidityTransactionsData)
    .orderBy([(liquidityTx: any) => liquidityTx?.timestamp], ['desc'])
    .map((liquidityTx: any) => {
      const liquidityRowObject: IObject = {};
      liquidityRowObject.underlyingTokenSymbol = poolObject.underlyingToken?.symbol;
      let action, amount, token1Symbol, token2Symbol;
      if (liquidityTx?.type === 'Join') {
        action = 'Add Liquidity';
      } else if (liquidityTx?.type === 'Exit') {
        action = 'Remove Liquidity';
      }
      if (poolObject.underlyingToken?.address?.toLowerCase() === liquidityTx?.token1?.toLowerCase()) {
        amount = liquidityTx?.tokenAmount1;
        token1Symbol = poolObject.underlyingToken?.symbol;
        token2Symbol = poolObject.epoch?.interestBearingSymbol;
      } else if (poolObject.underlyingToken?.address?.toLowerCase() === liquidityTx?.token2?.toLowerCase()) {
        amount = liquidityTx?.tokenAmount2;
        token1Symbol = poolObject.epoch?.interestBearingSymbol;
        token2Symbol = poolObject.underlyingToken?.symbol;
      }
      liquidityRowObject.action = action;
      liquidityRowObject.token1Symbol = token1Symbol;
      liquidityRowObject.token2Symbol = token2Symbol;

      liquidityRowObject.id = liquidityTx?.id;
      liquidityRowObject.tx = liquidityTx?.tx;
      liquidityRowObject.type = liquidityTx?.type;
      liquidityRowObject.value = bnum(amount).multipliedBy(poolObject.conversionRate);
      liquidityRowObject.token1Address = liquidityTx?.token1;
      liquidityRowObject.token1Amount = liquidityTx?.tokenAmount1;
      liquidityRowObject.token1Name = liquidityTx?.token1Sym;
      liquidityRowObject.token2Address = liquidityTx?.token2;
      liquidityRowObject.token2Amount = liquidityTx?.tokenAmount2;
      liquidityRowObject.token2Name = liquidityTx?.token2Sym;
      liquidityRowObject.endDate = moment.unix(parseInt(liquidityTx?.timestamp, 10)).fromNow();

      return liquidityRowObject;
    })
    .value();

  let previousTotalSwapVolume: BigNumber = ZERO;
  forEachRight(dataPastPools, (pastPool: any, index: string) => {
    const liquidityPastPoolObject: IObject = {};
    const poolToken =
      pastPool?.tokens?.[0]?.address?.toLowerCase() !== poolObject.epoch?.stream?.underlying.toLowerCase()
        ? pastPool?.tokens?.[0]
        : pastPool?.tokens?.[1];
    const underlyingToken =
      pastPool?.tokens?.[0]?.address?.toLowerCase() === poolToken?.address.toLowerCase()
        ? pastPool?.tokens?.[1]
        : pastPool?.tokens?.[0];
    const day = index === 'pool7' ? '' : moment().subtract(getIntegerFromString(index), 'days').format('ddd');

    let liquidity: BigNumber;
    if (poolObject.isOwnershipPool) {
      const timeStretch = kovanPoolData[poolId?.toString().toLowerCase()].otPool.timeStretch;
      const otFixedAPR = calcOtFixedAPR(timeStretch);
      const price = getOtPrice(otFixedAPR, poolObject.epoch?.startTimestamp, poolObject.epoch?.stream?.durationSeconds);
      liquidity = getOtPoolLiquidity(poolToken, underlyingToken, price, poolObject.conversionRate);
    } else {
      const price = getYtPrice(poolToken, underlyingToken);
      liquidity = getYtPoolLiquidity(poolToken, underlyingToken, price, poolObject.conversionRate);
    }
    liquidityPastPoolObject.liquidity = liquidity.dp(3, 1);
    liquidityPastPoolObject.day = day;

    const volumePastPoolObject: IObject = {};
    const swapVolume: BigNumber = bnum(pastPool?.totalSwapVolume).minus(previousTotalSwapVolume);
    previousTotalSwapVolume = bnum(pastPool?.totalSwapVolume);

    volumePastPoolObject.volume = swapVolume.dp(3, 1);
    volumePastPoolObject.day = day;

    liquidityPastPools.push(liquidityPastPoolObject);
    if (index !== 'pool7') {
      volumePastPools.push(volumePastPoolObject);
    }
  });

  return { poolObject, swapsData, liquidityData, liquidityPastPools, volumePastPools };
};

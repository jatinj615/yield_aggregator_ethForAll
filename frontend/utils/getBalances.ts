// * get aggregate balance calculation
import { ethers } from 'ethers';
import { forEach } from 'lodash-es';
import { bnum } from './poolCalc/utils/bignumber';
import {
  getTimeRemaining,
  calcRemainingDaysFromBlock,
  calcOtFixedAPR,
  calcEndDate,
  getOtPrice,
  getYtPrice
} from './calc';
import { Protocol } from 'enums';

interface IObject {
  [key: string]: any;
}

export const getBalances = ({
  _erc20,
  dataPoolStats,
  dataEpoches,
  aaveAPYData,
  compoundAPYData,
  yearnAPYData,
  kovanEpochData,
  kovanPoolData
}) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const balancerPools: IObject = {};
    const unrealEpochs: IObject = {};

    const lpBalancePromises = [];
    const otBalancePromises = [];
    const ytBalancePromises = [];

    const lpBalancePool = [];
    const otBalanceEpoch = [];
    const ytBalanceEpoch = [];

    const lpBalances = [];
    const otBalances = [];
    const ytBalances = [];

    // * step 1 aggregate the promises
    forEach(dataPoolStats?.pools, (pool) => {
      balancerPools[pool?.id] = pool;
      lpBalancePool.push(pool);
      lpBalancePromises.push(_erc20(pool.address).getBalance());
    });

    forEach(dataEpoches?.epoches, (epoch) => {
      // * set all of the epoch addresses in lowercase
      unrealEpochs[epoch?.address.toLowerCase()] = epoch;
      otBalanceEpoch.push(epoch);
      ytBalanceEpoch.push(epoch);
      otBalancePromises.push(_erc20(epoch.otToken.address).getBalance());
      ytBalancePromises.push(_erc20(epoch.yieldToken.address).getBalance());
    });

    // * execute the promises of each of these categories together
    // * get the lp balances
    try {
      let calculatedBalanceResults = await Promise.all(lpBalancePromises);
      forEach(calculatedBalanceResults, (lpBalance, index) => {
        const lpBalanceObject: IObject = {};
        const pool = lpBalancePool[index];

        if (lpBalance && !bnum(ethers.utils.formatEther(lpBalance.toString()).toString()).dp(3, 1).isZero()) {
          const epoch = unrealEpochs[kovanEpochData[pool?.id?.toLowerCase()]];
          const poolToken =
            pool?.tokens?.[0]?.address?.toLowerCase() !== epoch?.stream?.underlying?.toLowerCase()
              ? pool?.tokens?.[0]
              : pool?.tokens?.[1];
          const underlyingToken =
            pool?.tokens?.[0]?.address?.toLowerCase() === poolToken?.address?.toLowerCase()
              ? pool?.tokens?.[1]
              : pool?.tokens?.[0];

          lpBalanceObject.id = `lp-${pool?.address}`;
          lpBalanceObject.pool = pool;
          lpBalanceObject.name = pool?.name;
          lpBalanceObject.poolTokenBalance = poolToken?.balance;
          lpBalanceObject.poolTokenSymbol = poolToken?.symbol;
          lpBalanceObject.underlyingTokenSymbol = underlyingToken?.symbol;
          lpBalanceObject.poolTokenLiquidity = bnum(ethers.utils.formatEther(lpBalance))
            .div(pool?.totalShares)
            .multipliedBy(poolToken?.balance);
          lpBalanceObject.underlyingTokenLiquidity = bnum(ethers.utils.formatEther(lpBalance))
            .div(pool?.totalShares)
            .multipliedBy(underlyingToken?.balance);
          lpBalanceObject.shareOfPool = bnum(ethers.utils.formatEther(lpBalance))
            .multipliedBy(100)
            .div(pool?.totalShares);
          lpBalanceObject.durationSeconds = epoch?.stream?.durationSeconds;
          lpBalanceObject.startTimestamp = epoch?.startTimestamp;
          lpBalanceObject.streamKey = epoch?.stream?.meta;

          lpBalanceObject.endDate = calcEndDate(epoch?.startTimestamp, epoch?.stream?.durationSeconds);

          lpBalanceObject.duration = calcRemainingDaysFromBlock(epoch?.startTimestamp, epoch?.stream?.durationSeconds);

          lpBalanceObject.percentComplete = getTimeRemaining(epoch?.startTimestamp, epoch?.stream?.durationSeconds);

          lpBalances.push(lpBalanceObject);
        }
      });

      calculatedBalanceResults = await Promise.all(otBalancePromises);
      forEach(calculatedBalanceResults, (otBalance, index) => {
        const otBalanceObject: IObject = {};
        const epoch = otBalanceEpoch[index];

        if (otBalance && !otBalance.isZero()) {
          const apr = calcOtFixedAPR(kovanPoolData[epoch?.address.toLowerCase()]?.otPool?.timeStretch);
          const price = getOtPrice(apr, epoch?.startTimestamp, epoch?.stream?.durationSeconds);
          const pool = balancerPools[kovanPoolData[epoch?.address.toLowerCase()]?.otPool?.poolId.toLowerCase()];

          otBalanceObject.id = `ot-${pool?.address}`;
          otBalanceObject.pool = pool;
          otBalanceObject.token = epoch?.otToken;
          otBalanceObject.tokenSymbol = epoch?.otToken?.symbol;
          otBalanceObject.otFixedAPR = apr;
          otBalanceObject.balance = otBalance;
          otBalanceObject.currentValue = bnum(
            ethers.utils.formatUnits(otBalance, epoch?.stream?.underlyingDecimals)
          ).multipliedBy(price);
          otBalanceObject.durationSeconds = epoch?.stream?.durationSeconds;
          otBalanceObject.startTimestamp = epoch?.startTimestamp;
          otBalanceObject.streamKey = epoch?.stream?.meta;
          otBalanceObject.epochNumber = Number(epoch?.number);
          otBalanceObject.underlyingDecimals = epoch?.stream?.underlyingDecimals;
          otBalanceObject.currencySymbol = epoch?.stream?.tokenSymbol;

          otBalanceObject.endDate = calcEndDate(epoch?.startTimestamp, epoch?.stream?.durationSeconds);

          otBalanceObject.duration = calcRemainingDaysFromBlock(epoch?.startTimestamp, epoch?.stream?.durationSeconds);

          otBalanceObject.percentComplete = getTimeRemaining(epoch?.startTimestamp, epoch?.stream?.durationSeconds);

          otBalances.push(otBalanceObject);
        }
      });

      calculatedBalanceResults = await Promise.all(ytBalancePromises);
      forEach(calculatedBalanceResults, (ytBalance, index) => {
        const ytBalanceObject: IObject = {};
        const epoch = ytBalanceEpoch[index];
        let vaultApy;
        if (Protocol.AAVEV3 === Protocol[epoch?.stream?.protocol]) {
          vaultApy = aaveAPYData[epoch?.stream?.underlying];
        } else if (Protocol.COMP === Protocol[epoch?.stream?.protocol]) {
          vaultApy = compoundAPYData[epoch?.stream?.underlying];
        } else if (Protocol.YEARN === Protocol[epoch?.stream?.protocol]) {
          vaultApy = yearnAPYData[epoch?.stream?.underlying];
        }

        if (ytBalance && !ytBalance.isZero()) {
          const pool = balancerPools[kovanPoolData[epoch?.address.toLowerCase()]?.ytPool?.poolId.toLowerCase()];
          const yieldToken =
            pool?.tokens?.[0]?.address?.toLowerCase() !== epoch?.stream?.underlying?.toLowerCase()
              ? pool?.tokens?.[0]
              : pool?.tokens?.[1];
          const ytUnderlying =
            pool?.tokens?.[0]?.address?.toLowerCase() === yieldToken?.address?.toLowerCase()
              ? pool?.tokens?.[1]
              : pool?.tokens?.[0];
          const apr = calcOtFixedAPR(kovanPoolData[epoch?.address.toLowerCase()]?.otPool?.timeStretch);
          const price = getYtPrice(yieldToken, ytUnderlying);

          ytBalanceObject.id = `yt-${pool?.address}`;
          ytBalanceObject.pool = pool;
          ytBalanceObject.token = epoch?.yieldToken;
          ytBalanceObject.tokenSymbol = epoch?.yieldToken?.symbol;
          ytBalanceObject.otFixedAPR = apr;
          ytBalanceObject.balance = ytBalance;
          ytBalanceObject.currentValue = bnum(
            ethers.utils.formatUnits(ytBalance, epoch?.stream?.underlyingDecimals)
          ).multipliedBy(price);
          ytBalanceObject.durationSeconds = epoch?.stream?.durationSeconds;
          ytBalanceObject.startTimestamp = epoch?.startTimestamp;
          ytBalanceObject.streamKey = epoch?.stream?.meta;
          ytBalanceObject.epochNumber = Number(epoch?.number);
          ytBalanceObject.underlyingDecimals = epoch?.stream?.underlyingDecimals;
          ytBalanceObject.vaultApy = vaultApy;
          ytBalanceObject.currencySymbol = epoch?.stream?.tokenSymbol;

          ytBalanceObject.endDate = calcEndDate(epoch?.startTimestamp, epoch?.stream?.durationSeconds);

          ytBalanceObject.duration = calcRemainingDaysFromBlock(epoch?.startTimestamp, epoch?.stream?.durationSeconds);

          ytBalanceObject.percentComplete = getTimeRemaining(epoch?.startTimestamp, epoch?.stream?.durationSeconds);

          ytBalances.push(ytBalanceObject);
        }
      });
      // * return the values
      resolve({
        lpBalances,
        otBalances,
        ytBalances
      });
    } catch (error) {
      reject(error);
    }
  });
};

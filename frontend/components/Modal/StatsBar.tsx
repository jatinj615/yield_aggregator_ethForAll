import { useEffect, useState } from 'react';
import useUnrealCore from 'hooks/useUnrealCore';
import { useNetwork } from 'hooks/ethereum';
import { ethers } from 'ethers';
import LabelValue from 'components/atoms/LabelValue';
import SkeletonLoader from 'components/Common/SkeletonLoader';
import moment from 'moment';
import { bnum } from 'utils/poolCalc/utils/bignumber';
import { Card, CardHeader, CardContent, Divider, Grid, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NetworkStatus } from '@apollo/client';
import { forOwn } from 'lodash-es';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useGetAaveAPY, useGetCompoundAPY } from 'hooks/useApyGql';
import {
  calcEndDate,
  getAccInterest,
  calcOtFixedAPR,
  getOtPrice,
  getYtPrice,
  getOtPoolLiquidity,
  calcOtLPAPY,
  getYtPoolLiquidity,
  calcYtLPAPY,
  intlFormatNumber,
  calculateAaveAPY,
  calculateCompoundAPY
} from 'utils';
import { getYearnAPY } from 'utils/getYearnAPY';
import { contract } from 'utils/contracts';
import { SUPPORTED_NETWORK } from 'constants/networkNames';
import { Protocol } from 'enums';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
  background: theme.unreal.card.backgroundColor,
  boxShadow: '2px 2px 4px 0 rgba(0,0,0,0.5) !important',
  '&:hover': {
    boxShadow: '1px 4px 6px 1px #776e6e !important'
  },
  borderRadius: theme.typography.pxToRem(12)
}));

// holds all vault addresses
const vaultAddresses: string[] = [];

forOwn(contract.vaults.yearn, (value, key) => {
  vaultAddresses.push(value);
});

interface IObject {
  [key: string]: any;
}

export default function StatsBar({
  epoch,
  pool,
  conversionRate,
  handleTermComplete,
  poolToken,
  underlyingToken,
  isOwnershipPool,
  timeStretch,
  loading = false
}) {
  const streamKey = epoch?.stream?.meta;
  const protocol = epoch?.stream?.protocol;
  const { getYield, getYieldRemaining } = useUnrealCore(streamKey);
  const theme = useTheme();
  const { active, library } = useWeb3React<Web3Provider>();
  const network = useNetwork(library);

  const [remYield, setRemYield] = useState<ethers.BigNumber | string>('-');
  const [vaultApy, setVaultApy] = useState(0);
  const [poolEndDate, setPoolEndDate] = useState('');
  const [yearnAllData, setYearnAllData] = useState<IObject>();
  const [yearnAllLoading, setYearnAllLoading] = useState<boolean>(false);

  const [
    getAaveAPY,
    {
      loading: loadingAaveAPY,
      error: errorAaveAPY,
      data: dataAaveAPY,
      refetch: refetchAaveAPY,
      networkStatus: networkStatusAaveAPY,
      startPolling: startPollingAaveAPY,
      stopPolling: stopPollingAaveAPY
    }
  ] = useGetAaveAPY();

  const [
    getCompoundAPY,
    {
      loading: loadingCompoundAPY,
      error: errorCompoundAPY,
      data: dataCompoundAPY,
      refetch: refetchCompoundAPY,
      networkStatus: networkStatusCompoundAPY,
      startPolling: startPollingCompoundAPY,
      stopPolling: stopPollingCompoundAPY
    }
  ] = useGetCompoundAPY();

  useEffect(() => {
    let isActive = true;

    const fetchYearnAPY = async (underlyingAddresses) => {
      setYearnAllLoading(false);

      try {
        const dataYearnAPY = await getYearnAPY(underlyingAddresses, vaultAddresses);
        if (!isActive) {
          return;
        }
        setYearnAllData(dataYearnAPY);
      } finally {
        setYearnAllLoading(true);
      }
    };

    const underlyingAddress = epoch?.stream?.underlying;

    if (Protocol.AAVEV3 === Protocol[protocol]) {
      getAaveAPY({ variables: { underlyingAddresses: [underlyingAddress] } });
    } else if (Protocol.COMP === Protocol[protocol]) {
      getCompoundAPY({ variables: { underlyingAddresses: [underlyingAddress] } });
    } else if (Protocol.YEARN === Protocol[protocol]) {
      fetchYearnAPY([underlyingAddress]);
    }

    // Clean the state when the component is unmounted
    return () => {
      isActive = false;
      setYearnAllData(null);
    };
  }, [protocol]);

  useEffect(() => {
    // sets isTermCompleted
    const isTermComplete = moment(poolEndDate, 'MMM DD, YYYY').isSameOrBefore(moment(), 'day');
    handleTermComplete(isTermComplete);

    if (epoch?.address && epoch?.number && poolEndDate && active && network === SUPPORTED_NETWORK) {
      if (isTermComplete) {
        getYieldRemaining(epoch?.number).then((res) => {
          setRemYield(res);
        });
      } else {
        getYield(epoch?.address).then((res) => {
          setRemYield(res);
        });
      }
    }

    if (
      networkStatusAaveAPY === NetworkStatus.ready ||
      networkStatusCompoundAPY === NetworkStatus.ready ||
      yearnAllLoading
    ) {
      let vaultApy;
      if (Protocol.AAVEV3 === Protocol[protocol]) {
        vaultApy = calculateAaveAPY(dataAaveAPY?.reserves?.[0]?.liquidityRate);
      } else if (Protocol.COMP === Protocol[protocol]) {
        vaultApy = calculateCompoundAPY(dataCompoundAPY?.markets?.[0]?.supplyRate);
      } else if (Protocol.YEARN === Protocol[protocol]) {
        vaultApy = yearnAllData?.[0]?.apy?.net_apy;
      }
      setVaultApy(vaultApy);
    }

    // Clean the state when the component is unmounted
    return () => {
      setRemYield('-');
      setVaultApy(0);
    };
  }, [poolEndDate, active, network, networkStatusAaveAPY, networkStatusCompoundAPY, yearnAllLoading]);

  useEffect(() => {
    if (epoch?.startTimestamp && epoch?.stream?.durationSeconds) {
      const endDate = calcEndDate(epoch?.startTimestamp, epoch?.stream?.durationSeconds);
      setPoolEndDate(endDate);
    }
  }, [epoch]);

  const underlyingTokenSymbol = underlyingToken?.symbol;
  const poolTokenSymbol = poolToken?.symbol;

  const otFixedAPR = calcOtFixedAPR(timeStretch);
  let price, liquidity, lpapy;

  if (isOwnershipPool) {
    price = getOtPrice(otFixedAPR, epoch?.startTimestamp, epoch?.stream?.durationSeconds);
    liquidity = getOtPoolLiquidity(poolToken, underlyingToken, price, conversionRate);
    lpapy = calcOtLPAPY(liquidity, pool?.totalSwapFee);
  } else {
    price = getYtPrice(poolToken, underlyingToken);
    liquidity = getYtPoolLiquidity(poolToken, underlyingToken, price, conversionRate);
    lpapy = calcYtLPAPY(liquidity, pool?.totalSwapFee);
  }

  const getTotalLiquidity = () => {
    return `$ ${intlFormatNumber(bnum(liquidity).dp(3, 1).toString(), 3)}`;
  };

  const getLPAPY = () => {
    return `${intlFormatNumber(bnum(lpapy).dp(3, 1).toString(), 3)} %`;
  };

  const getTotalFees = () => {
    return `$ ${intlFormatNumber(bnum(pool?.totalSwapFee).dp(3, 1).toString(), 3)}`;
  };

  const getPoolTokenBalance = () => {
    return intlFormatNumber(bnum(poolToken?.balance).dp(3, 1).toString(), 3);
  };

  const getUnderlyingTokenBalance = () => {
    return intlFormatNumber(bnum(underlyingToken?.balance).dp(3, 1).toString(), 3);
  };

  const getUnrealTVL = () => {
    return `$ ${intlFormatNumber(
      bnum(ethers.utils.formatUnits(epoch?.tvl, epoch?.stream?.underlyingDecimals)).dp(3, 1).toString(),
      3
    )}`;
  };

  const getVaultAPY = () => {
    return `${intlFormatNumber(bnum(vaultApy).dp(3, 1).multipliedBy(100).toString(), 3)} %`;
  };

  const getPrice = () => {
    return `$ ${intlFormatNumber(price.multipliedBy(conversionRate).dp(3, 1).toString(), 3)}`;
  };

  const getPoolPrice = () => {
    return intlFormatNumber(price.dp(3, 1).toString(), 3);
  };

  const getFixedRateAPR = () => {
    return `${intlFormatNumber(otFixedAPR.dp(3, 1).toString(), 3)} %`;
  };

  const showAccInterest = () => {
    if (remYield instanceof ethers.BigNumber) {
      return intlFormatNumber(
        getAccInterest(ethers.utils.formatEther(remYield), conversionRate).dp(3, 1).toString(),
        3
      );
    } else {
      return remYield;
    }
  };

  const showUnderlyingAccInterest = () => {
    if (remYield instanceof ethers.BigNumber) {
      return intlFormatNumber(bnum(ethers.utils.formatEther(remYield)).dp(3, 1).toString(), 3);
    } else {
      return remYield;
    }
  };

  return (
    <Grid mb={4} container item justifyContent="space-between" columnSpacing={4}>
      <Grid xs={4} item>
        <StyledCard>
          <CardHeader
            subheader="Pool Summary"
            subheaderTypographyProps={{ sx: { fontWeight: theme.typography.fontWeightBold } }}
          />
          <Divider />
          <CardContent>
            <Grid container item flexWrap="nowrap" justifyContent="space-between">
              <Grid item xs={6}>
                <LabelValue
                  label="Total Liquidity"
                  value={loading ? <SkeletonLoader width="80%" /> : getTotalLiquidity()}
                />
                <LabelValue label="LP APY (1 Yr)" value={loading ? <SkeletonLoader width="80%" /> : getLPAPY()} />
                <LabelValue label="Total Fees" value={loading ? <SkeletonLoader width="80%" /> : getTotalFees()} />
              </Grid>
              <Grid item xs={6}>
                <LabelValue
                  label={
                    loading ? (
                      <Grid container item columnGap={1}>
                        Quantity <SkeletonLoader width="40%" />
                      </Grid>
                    ) : (
                      `Quantity (${isOwnershipPool ? 'O' : 'Y'}T)`
                    )
                  }
                  value={loading ? <SkeletonLoader width="80%" /> : getPoolTokenBalance()}
                />
                <LabelValue
                  label={
                    loading ? (
                      <Grid container item columnGap={1}>
                        Quantity <SkeletonLoader width="40%" />
                      </Grid>
                    ) : (
                      `Quantity (${underlyingTokenSymbol})`
                    )
                  }
                  value={loading ? <SkeletonLoader width="80%" /> : getUnderlyingTokenBalance()}
                />
              </Grid>
            </Grid>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid xs={4} item>
        <StyledCard>
          <CardHeader
            subheader="Term Summary"
            subheaderTypographyProps={{ sx: { fontWeight: theme.typography.fontWeightBold } }}
          />
          <Divider />
          <CardContent>
            <Grid container item flexWrap="nowrap" justifyContent="space-between">
              <Grid item xs={6}>
                <LabelValue
                  label="Total Value Locked"
                  value={loading ? <SkeletonLoader width="80%" /> : getUnrealTVL()}
                />
                <LabelValue
                  label="Start Date"
                  value={
                    loading ? (
                      <SkeletonLoader width="80%" />
                    ) : (
                      moment.unix(parseInt(pool?.createTime, 10)).format('MMM DD, YYYY')
                    )
                  }
                />
                <LabelValue label="Expires On" value={loading ? <SkeletonLoader width="80%" /> : poolEndDate} />
              </Grid>
              <Grid item xs={6}>
                <LabelValue
                  label="Underlying Vault"
                  value={loading ? <SkeletonLoader width="80%" /> : protocol + ' ' + epoch?.interestBearingSymbol}
                />
                <LabelValue label="Vault APY" value={loading ? <SkeletonLoader width="80%" /> : getVaultAPY()} />
              </Grid>
            </Grid>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid xs={4} item>
        <StyledCard>
          <CardHeader
            subheader="Token Summary"
            subheaderTypographyProps={{ sx: { fontWeight: theme.typography.fontWeightBold } }}
          />
          <Divider />
          <CardContent>
            <Grid container item flexWrap="nowrap" justifyContent="space-between">
              <Grid item xs={6}>
                <LabelValue label="Price" value={loading ? <SkeletonLoader width="80%" /> : getPrice()} />
                <LabelValue
                  label={
                    loading ? (
                      <Grid container item columnGap={1}>
                        Price <SkeletonLoader width="53%" />
                      </Grid>
                    ) : (
                      `Price (${underlyingTokenSymbol})`
                    )
                  }
                  value={loading ? <SkeletonLoader width="80%" /> : getPoolPrice()}
                />
                <LabelValue label="Token" value={loading ? <SkeletonLoader width="80%" /> : poolTokenSymbol} />
              </Grid>
              {isOwnershipPool ? (
                <Grid item xs={6}>
                  <LabelValue
                    label="Fixed Rate APR"
                    value={loading ? <SkeletonLoader width="80%" /> : getFixedRateAPR()}
                  />
                </Grid>
              ) : (
                <Grid item xs={6}>
                  <LabelValue
                    label="Acc. Interest"
                    value={loading ? <SkeletonLoader width="80%" /> : showAccInterest()}
                  />
                  <LabelValue
                    label={
                      loading ? (
                        <Grid container item columnGap={1}>
                          Acc. Interest <SkeletonLoader width="21%" />
                        </Grid>
                      ) : (
                        `Acc. Interest (${underlyingTokenSymbol})`
                      )
                    }
                    value={loading ? <SkeletonLoader width="80%" /> : showUnderlyingAccInterest()}
                  />
                </Grid>
              )}
            </Grid>
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
}

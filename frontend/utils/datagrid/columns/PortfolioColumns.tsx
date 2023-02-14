import { ethers } from 'ethers';
import { Avatar, Chip, Grid, Theme } from '@mui/material';
import moment from 'moment';

import { portfolioCurrentValueSymbol } from 'utils/datagrid/portfolioConfig';
import { intlFormatNumber } from 'utils/formatNumber';
import { bnum } from 'utils/poolCalc/utils/bignumber';
import { getCurrencyPath } from 'constants/currencyPaths';

import SkeletonLoader from 'components/Common/SkeletonLoader';

interface IColumnProps {
  params?: any;
  isOTBalancesDatagrid?: boolean;
  isLPBalancesDatagrid?: boolean;
  theme?: Theme;
  minWidth?: number;
  loading?: boolean;
  cellPadding?: number;
}

export function TokenName({
  params,
  isLPBalancesDatagrid = false,
  minWidth,
  loading = false,
  cellPadding = 1.25
}: IColumnProps) {
  const cellSx = loading ? { minWidth, px: cellPadding, pl: 3 } : {};

  return (
    <Grid container item xs alignItems="center" {...cellSx}>
      <Grid item xs={2}>
        {loading ? (
          <SkeletonLoader variant="circular">
            <Avatar />
          </SkeletonLoader>
        ) : (
          <Avatar
            alt="Currency Logo"
            src={getCurrencyPath(
              isLPBalancesDatagrid ? params?.row?.underlyingTokenSymbol : params?.row?.currencySymbol
            )}
          />
        )}
      </Grid>
      <Grid item xs={10}>
        {loading ? <SkeletonLoader width="80%" /> : <>{params?.value}</>}
      </Grid>
    </Grid>
  );
}

export function FixedAPRPositionAPY({
  params,
  isOTBalancesDatagrid,
  minWidth,
  loading = false,
  cellPadding = 1.25
}: IColumnProps) {
  if (loading) {
    return (
      <Grid item xs minWidth={minWidth} px={cellPadding}>
        <SkeletonLoader width="80%" />
      </Grid>
    );
  }

  const value = isOTBalancesDatagrid
    ? intlFormatNumber(params?.value.dp(2, 1).toString(), 2)
    : intlFormatNumber(
        bnum(
          typeof params?.value === 'number'
            ? params?.value
            : ethers.utils.formatEther(params?.value ? params?.value : 0)
        )
          .dp(3, 1)
          .toString(),
        3
      );

  return <>{`${value}%`}</>;
}

export function TotalBalance({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  return loading ? (
    <Grid item xs minWidth={minWidth} px={cellPadding}>
      <SkeletonLoader width="80%" />
    </Grid>
  ) : (
    <>
      {intlFormatNumber(
        bnum(
          typeof params?.value === 'number'
            ? params?.value
            : ethers.utils.formatUnits(params?.value ? params?.value : 0, params?.row?.underlyingDecimals)
        )
          .dp(6, 1)
          .toString(),
        6
      )}
    </>
  );
}

export function CurrentValue({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  return loading ? (
    <Grid item xs minWidth={minWidth} px={cellPadding}>
      <SkeletonLoader width="80%" />
    </Grid>
  ) : (
    <>{`${intlFormatNumber(params?.value.dp(6, 1).toString(), 6)} ${portfolioCurrentValueSymbol}`}</>
  );
}

export function PoolTokenLiquidity({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  return loading ? (
    <Grid item xs minWidth={minWidth} px={cellPadding}>
      <SkeletonLoader width="80%" />
    </Grid>
  ) : (
    <>{`${intlFormatNumber(params?.value.dp(3, 1).toString(), 3)} ${params?.row?.poolTokenSymbol}`}</>
  );
}

export function UnderlyingTokenLiquidity({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  return loading ? (
    <Grid item xs minWidth={minWidth} px={cellPadding}>
      <SkeletonLoader width="80%" />
    </Grid>
  ) : (
    <>{`${intlFormatNumber(params?.value.dp(3, 1).toString(), 3)} ${params?.row?.underlyingTokenSymbol}`}</>
  );
}

export function ShareOfPool({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  return loading ? (
    <Grid item xs minWidth={minWidth} px={cellPadding}>
      <SkeletonLoader width="80%" />
    </Grid>
  ) : (
    <>{`${intlFormatNumber(params?.value.dp(3, 1).toString(), 3)} %`}</>
  );
}

export function Term({ params, theme, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  if (loading) {
    return (
      <Grid item xs minWidth={minWidth} px={cellPadding}>
        <SkeletonLoader
          sx={{ borderRadius: theme.typography.pxToRem(5) }}
          variant="rectangular"
          width={100}
          height={32}
        />
      </Grid>
    );
  }

  const yellowBreakpoint = moment.unix(
    parseInt(params?.row?.startTimestamp, 10) + parseInt(params?.row?.durationSeconds, 10) * 0.6
  );
  const greenBreakpoint = moment.unix(
    parseInt(params?.row?.startTimestamp, 10) + parseInt(params?.row?.durationSeconds, 10) * 0.9
  );
  let chipTheme = theme.unreal.datagrid.chip.red;
  if (moment().isSameOrAfter(greenBreakpoint)) {
    chipTheme = theme.unreal.datagrid.chip.green;
  } else if (moment().isBetween(yellowBreakpoint, greenBreakpoint, undefined, '[)')) {
    chipTheme = theme.unreal.datagrid.chip.yellow;
  }

  return (
    <Chip
      sx={{
        '& .MuiChip-label': {
          fontWeight: theme.typography.fontWeightBold
        },
        borderRadius: theme.typography.pxToRem(5),
        ...chipTheme
      }}
      label={params?.value}
    />
  );
}

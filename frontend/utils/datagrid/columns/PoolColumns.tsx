import { ethers } from 'ethers';
import { Avatar, Chip, Grid, Theme } from '@mui/material';
import moment from 'moment';

import { intlFormatNumber } from 'utils/formatNumber';
import { bnum } from 'utils/poolCalc/utils/bignumber';
import { getCurrencyPath } from 'constants/currencyPaths';

import ProgressBar from 'components/Common/ProgressBar';
import SkeletonLoader from 'components/Common/SkeletonLoader';

interface IColumnProps {
  params?: any;
  theme?: Theme;
  minWidth?: number;
  loading?: boolean;
  cellPadding?: number;
}

export function PoolName({ params, theme, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  const cellSx = loading ? { minWidth, px: cellPadding, pl: 3 } : {};

  return (
    <Grid container item xs alignItems="center" {...cellSx}>
      <Grid item xs={3}>
        {loading ? (
          <SkeletonLoader variant="circular">
            <Avatar />
          </SkeletonLoader>
        ) : (
          <Avatar alt="Currency Logo" src={getCurrencyPath(params?.value)} />
        )}
      </Grid>
      <Grid container item xs={8} direction="column" rowSpacing={3}>
        <Grid container item direction="column">
          {loading ? (
            <>
              <Grid item>
                <SkeletonLoader />
              </Grid>
              <Grid item>
                <SkeletonLoader width="60%" />
              </Grid>
            </>
          ) : (
            <>
              <Grid item>{`${params?.value} - ${params?.row?.poolTokenSymbol}`}</Grid>
              <Grid item>{params?.row?.duration}</Grid>
            </>
          )}
        </Grid>
        <Grid item>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <ProgressBar variant="determinate" value={params?.row?.percentComplete} theme={theme} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export function Liquidity({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  return loading ? (
    <Grid item xs minWidth={minWidth} px={cellPadding}>
      <SkeletonLoader width="80%" />
    </Grid>
  ) : (
    <>{`$ ${intlFormatNumber(params?.value.dp(3, 1).toString(), 3)}`}</>
  );
}

export function FixedAPR({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  return loading ? (
    <Grid item xs minWidth={minWidth} px={cellPadding}>
      <SkeletonLoader width="80%" />
    </Grid>
  ) : (
    <>{`${intlFormatNumber(params?.value.dp(3, 1).toString(), 3)} %`}</>
  );
}

export function LPAPY({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  return loading ? (
    <Grid item xs minWidth={minWidth} px={cellPadding}>
      <SkeletonLoader width="80%" />
    </Grid>
  ) : (
    <>{`${intlFormatNumber(params?.value.dp(3, 1).toString(), 3)} %`}</>
  );
}

export function VaultAPY({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  return loading ? (
    <Grid item xs minWidth={minWidth} px={cellPadding}>
      <SkeletonLoader width="80%" />
    </Grid>
  ) : (
    <>{`${intlFormatNumber(
      bnum(
        typeof params?.value === 'number' ? params?.value : ethers.utils.formatEther(params?.value ? params?.value : 0)
      )
        .dp(3, 1)
        .multipliedBy(100)
        .toString(),
      3
    )} %`}</>
  );
}

export function Price({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  return loading ? (
    <Grid item xs minWidth={minWidth} px={cellPadding}>
      <SkeletonLoader width="80%" />
    </Grid>
  ) : (
    <>{`$ ${intlFormatNumber(params?.value.dp(3, 1).toString(), 3)}`}</>
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
  const redBreakpoint = moment.unix(
    parseInt(params?.row?.startTimestamp, 10) + parseInt(params?.row?.durationSeconds, 10) * 0.9
  );
  let chipTheme = theme.yielder.datagrid.chip.green;
  if (moment().isSameOrAfter(redBreakpoint)) {
    chipTheme = theme.yielder.datagrid.chip.red;
  } else if (moment().isBetween(yellowBreakpoint, redBreakpoint, undefined, '[)')) {
    chipTheme = theme.yielder.datagrid.chip.yellow;
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

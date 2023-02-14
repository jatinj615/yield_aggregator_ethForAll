import Link from 'next/link';
import { Avatar, Grid, Link as MUILink } from '@mui/material';

import SkeletonLoader from 'components/Common/SkeletonLoader';

import { ExplorerDataType, intlFormatNumber, getExplorerLink } from 'utils';
import { bnum } from 'utils/poolCalc/utils/bignumber';
import { getCurrencyPath } from 'constants/currencyPaths';

interface IColumnProps {
  params?: any;
  isSwapsDatagrid?: boolean;
  minWidth?: number;
  loading?: boolean;
  cellPadding?: number;
}

export function Action({
  params,
  isSwapsDatagrid = false,
  minWidth,
  loading = false,
  cellPadding = 1.25
}: IColumnProps) {
  if (loading) {
    return (
      <Grid item xs minWidth={minWidth} px={cellPadding} pl={3}>
        <SkeletonLoader width={isSwapsDatagrid ? '80%' : '50%'} />
      </Grid>
    );
  }

  const link = `${getExplorerLink(params?.row?.tx, ExplorerDataType.TRANSACTION)}`;

  return (
    <Link href={link} passHref>
      <MUILink color="inherit" underline="hover" target="_blank" rel="noopener noreferrer">
        {isSwapsDatagrid ? `Swap ${params?.value} for ${params?.row?.tokenOutName}` : params?.value}
      </MUILink>
    </Link>
  );
}

export function Value({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  return loading ? (
    <Grid item xs minWidth={minWidth} px={cellPadding}>
      <SkeletonLoader sx={{ mr: 10 - cellPadding }} />
    </Grid>
  ) : (
    <Grid container alignItems="center" justifyContent="flex-end">
      <Grid item>{`$ ${intlFormatNumber(params?.value.dp(3, 1).toString(), 3)}`}</Grid>
    </Grid>
  );
}

export function TokenIn({
  params,
  isSwapsDatagrid = false,
  minWidth,
  loading = false,
  cellPadding = 1.25
}: IColumnProps) {
  const cellSx = loading ? { minWidth, px: cellPadding } : {};

  if (isSwapsDatagrid) {
    return (
      <Grid container item xs alignItems="center" columnGap={1} {...cellSx}>
        <Grid item xs={2}>
          {loading ? (
            <SkeletonLoader variant="circular">
              <Avatar sx={{ width: 28, height: 28 }} />
            </SkeletonLoader>
          ) : (
            <Avatar
              alt="Currency Logo"
              src={getCurrencyPath(params?.row?.tokenInSymbol)}
              sx={{ width: 28, height: 28 }}
            />
          )}
        </Grid>
        <Grid item xs={8}>
          {loading ? <SkeletonLoader width="80%" /> : intlFormatNumber(bnum(params?.value).dp(3, 1).toString(), 3)}
        </Grid>
      </Grid>
    );
  } else if (loading) {
    return (
      <Grid container item xs direction="column" rowGap={1} {...cellSx}>
        <Grid container item alignItems="center" columnGap={1}>
          <Grid item xs={2}>
            <SkeletonLoader variant="circular">
              <Avatar sx={{ width: 28, height: 28 }} />
            </SkeletonLoader>
          </Grid>
          <Grid item xs={8}>
            <SkeletonLoader width="80%" />
          </Grid>
        </Grid>
        <Grid container item alignItems="center" columnGap={1}>
          <Grid item xs={2}>
            <SkeletonLoader variant="circular">
              <Avatar sx={{ width: 28, height: 28 }} />
            </SkeletonLoader>
          </Grid>
          <Grid item xs={8}>
            <SkeletonLoader width="80%" />
          </Grid>
        </Grid>
      </Grid>
    );
  } else if (params?.row?.type === 'Join') {
    return (
      <Grid container direction="column" rowGap={1}>
        <Grid container item alignItems="center" columnGap={1}>
          <Grid item xs={2}>
            <Avatar
              alt="Currency Logo"
              src={getCurrencyPath(params?.row?.token1Symbol)}
              sx={{ width: 28, height: 28 }}
            />
          </Grid>
          <Grid item xs={8}>
            {intlFormatNumber(bnum(params?.value).dp(3, 1).toString(), 3)}
          </Grid>
        </Grid>
        <Grid container item alignItems="center" columnGap={1}>
          <Grid item xs={2}>
            <Avatar
              alt="Currency Logo"
              src={getCurrencyPath(params?.row?.token2Symbol)}
              sx={{ width: 28, height: 28 }}
            />
          </Grid>
          <Grid item xs={8}>
            {intlFormatNumber(bnum(params?.row?.token2Amount).dp(3, 1).toString(), 3)}
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return <></>;
  }
}

export function TokenOut({
  params,
  isSwapsDatagrid = false,
  minWidth,
  loading = false,
  cellPadding = 1.25
}: IColumnProps) {
  const cellSx = loading ? { minWidth, px: cellPadding } : {};

  if (isSwapsDatagrid) {
    return (
      <Grid container item xs alignItems="center" columnGap={1} {...cellSx}>
        <Grid item xs={2}>
          {loading ? (
            <SkeletonLoader variant="circular">
              <Avatar sx={{ width: 28, height: 28 }} />
            </SkeletonLoader>
          ) : (
            <Avatar
              alt="Currency Logo"
              src={getCurrencyPath(params?.row?.tokenOutSymbol)}
              sx={{ width: 28, height: 28 }}
            />
          )}
        </Grid>
        <Grid item xs={8}>
          {loading ? <SkeletonLoader width="80%" /> : intlFormatNumber(bnum(params?.value).dp(3, 1).toString(), 3)}
        </Grid>
      </Grid>
    );
  } else if (loading) {
    return (
      <Grid container item xs direction="column" rowGap={1} {...cellSx}>
        <Grid container item alignItems="center" columnGap={1}>
          <Grid item xs={2}>
            <SkeletonLoader variant="circular">
              <Avatar sx={{ width: 28, height: 28 }} />
            </SkeletonLoader>
          </Grid>
          <Grid item xs={8}>
            <SkeletonLoader width="80%" />
          </Grid>
        </Grid>
        <Grid container item alignItems="center" columnGap={1}>
          <Grid item xs={2}>
            <SkeletonLoader variant="circular">
              <Avatar sx={{ width: 28, height: 28 }} />
            </SkeletonLoader>
          </Grid>
          <Grid item xs={8}>
            <SkeletonLoader width="80%" />
          </Grid>
        </Grid>
      </Grid>
    );
  } else if (params?.row?.type === 'Exit') {
    return (
      <Grid container direction="column" rowGap={1}>
        <Grid container item alignItems="center" columnGap={1}>
          <Grid item xs={2}>
            <Avatar
              alt="Currency Logo"
              src={getCurrencyPath(params?.row?.token1Symbol)}
              sx={{ width: 28, height: 28 }}
            />
          </Grid>
          <Grid item xs={8}>
            {intlFormatNumber(bnum(params?.row?.token1Amount).dp(3, 1).toString(), 3)}
          </Grid>
        </Grid>
        <Grid container item alignItems="center" columnGap={1}>
          <Grid item xs={2}>
            <Avatar
              alt="Currency Logo"
              src={getCurrencyPath(params?.row?.token2Symbol)}
              sx={{ width: 28, height: 28 }}
            />
          </Grid>
          <Grid item xs={8}>
            {intlFormatNumber(bnum(params?.value).dp(3, 1).toString(), 3)}
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return <></>;
  }
}

export function EndDate({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  return loading ? (
    <Grid item xs minWidth={minWidth} px={cellPadding}>
      <SkeletonLoader sx={{ ml: '40%', mr: 3 - cellPadding }} />
    </Grid>
  ) : (
    <>{params?.value}</>
  );
}

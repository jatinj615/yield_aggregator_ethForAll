import { ethers } from 'ethers';
import { Avatar, Grid, Theme, Typography } from '@mui/material';
import SkeletonLoader from 'components/Common/SkeletonLoader';

interface IColumnProps {
  params?: any;
  theme?: Theme;
  minWidth?: number;
  loading?: boolean;
  cellPadding?: number;
}

export function Stream({ params, theme, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  const cellSx = loading ? { minWidth, px: cellPadding, pl: 3 } : {};

  return (
    <Grid container item xs justifyContent="space-between" alignItems="center" {...cellSx}>
      <Grid item xs={3}>
        {loading ? (
          <SkeletonLoader variant="circular">
            <Avatar />
          </SkeletonLoader>
        ) : (
          <Avatar alt="Currency Logo" src="./png/currencies/ethereum-eth-logo.png" />
        )}
      </Grid>
      <Grid container item xs={8} direction="column" rowSpacing={3}>
        <Grid container item direction="column">
          {loading ? (
            <>
              <Grid item>
                <SkeletonLoader width="60%" />
              </Grid>
              <Grid item>
                <SkeletonLoader width="80%" />
              </Grid>
            </>
          ) : (
            <>
              <Grid item>{params?.value}</Grid>
              <Grid item>{`${params?.row?.name} ${params?.row?.chain_name}`}</Grid>
            </>
          )}
        </Grid>
        {/* <Grid item>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <ProgressBar variant="determinate" value={10} theme={theme} />
          )}
        </Grid> */}
      </Grid>
    </Grid>
  );
}

export function YielderTVL({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  return loading ? (
    <Grid item xs minWidth={minWidth} px={cellPadding}>
      <SkeletonLoader width="80%" />
    </Grid>
  ) : (
    <>{`$ ${params?.row?.totalLiquidity}`}</>
  );
}

export function VaultAPY({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  return loading ? (
    <Grid item xs minWidth={minWidth} px={cellPadding}>
      <SkeletonLoader width="80%" />
    </Grid>
  ) : (
    <>{`${params?.row?.yield_percentage} %`}</>
  );
}

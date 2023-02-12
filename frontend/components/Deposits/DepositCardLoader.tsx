import { Grid, Theme } from '@mui/material';

import { depositColumns } from 'utils/datagrid';
import {
  FixedAPR,
  Liquidity,
  LPAPY,
  Price,
  Stream,
  Term,
  UnrealTVL,
  VaultAPY
} from 'utils/datagrid/columns/DepositColumns';

interface IDepositCardLoaderProps {
  theme: Theme;
  rowHeight: number;
}

function DepositCardLoader({ theme, rowHeight }: IDepositCardLoaderProps) {
  return (
    <Grid
      sx={{
        backgroundColor: theme.unreal.card.backgroundColor,
        borderRadius: theme.typography.pxToRem(8),
        maxHeight: 'none !important',
        height: rowHeight
      }}
      container
      wrap="nowrap"
      alignItems="center"
      mb={2.5}
    >
      {/* Stream */}
      <Stream minWidth={depositColumns.stream.minWidth} loading />
      {/* Unreal TVL */}
      <UnrealTVL minWidth={depositColumns.unrealTVL.minWidth} loading />
      {/* Vault APY */}
      <VaultAPY minWidth={depositColumns.vaultAPY.minWidth} loading />
      {/* LP APY */}
      <LPAPY minWidth={depositColumns.lpAPY.minWidth} loading theme={theme} />
      {/* Liquidity */}
      <Liquidity minWidth={depositColumns.liquidity.minWidth} loading theme={theme} />
      {/* Price */}
      <Price minWidth={depositColumns.price.minWidth} loading theme={theme} />
      {/* Fixed APR */}
      <FixedAPR minWidth={depositColumns.fixedAPR.minWidth} loading />
      {/* Term */}
      <Term minWidth={depositColumns.term.minWidth} loading theme={theme} />
    </Grid>
  );
}

export default DepositCardLoader;

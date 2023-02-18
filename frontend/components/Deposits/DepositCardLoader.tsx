import { Grid, Theme } from '@mui/material';

import { depositColumns } from 'utils/datagrid';
import {
  Stream,
  YielderTVL,
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
        backgroundColor: theme.yielder.card.backgroundColor,
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
      {/* yielder TVL */}
      <YielderTVL minWidth={depositColumns.YielderTVL.minWidth} loading />
      {/* Vault APY */}
      <VaultAPY minWidth={depositColumns.vaultAPY.minWidth} loading />
    </Grid>
  );
}

export default DepositCardLoader;

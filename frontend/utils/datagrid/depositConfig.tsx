import { ethers } from 'ethers';
import { Theme } from '@mui/material';
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid';

import { BigNumber } from 'utils/poolCalc/utils/bignumber';
import {
  Stream,
  YielderTVL,
  VaultAPY
} from 'utils/datagrid/columns/DepositColumns';

export const depositDatagridRowHeight: number = 150;

export const depositColumns = {
  stream: {
    minWidth: 250
  },
  YielderTVL: {
    minWidth: 150
  },
  vaultAPY: {
    minWidth: 100
  },
  lpAPY: {
    minWidth: 125
  },
  liquidity: {
    minWidth: 175
  },
  price: {
    minWidth: 150
  },
  fixedAPR: {
    minWidth: 100
  },
  term: {
    minWidth: 150
  }
};

export const getDepositDatagridColumns = (theme: Theme): GridColumns => {
  return [
    {
      field: 'name',
      headerName: 'Vault',
      headerClassName: 'MuiDataGrid-columnHeader--stream',
      cellClassName: 'MuiDataGrid-cell--stream',
      minWidth: depositColumns.stream.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <Stream params={params} theme={theme} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'tvl',
      headerName: 'Total Liquidity',
      minWidth: depositColumns.YielderTVL.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<ethers.BigNumber>) => {
        return <YielderTVL params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'vaultApy',
      headerName: 'Vault APY',
      minWidth: depositColumns.vaultAPY.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<ethers.BigNumber>) => {
        return <VaultAPY params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
  ];
};

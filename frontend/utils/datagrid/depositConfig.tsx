import { ethers } from 'ethers';
import { Theme } from '@mui/material';
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid';

import { BigNumber } from 'utils/poolCalc/utils/bignumber';
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

export const depositDatagridRowHeight: number = 150;

export const depositColumns = {
  stream: {
    minWidth: 250
  },
  unrealTVL: {
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
      headerName: 'Stream',
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
      headerName: 'Unreal TVL',
      minWidth: depositColumns.unrealTVL.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<ethers.BigNumber>) => {
        return <UnrealTVL params={params} />;
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
    {
      field: 'lpApyOt',
      headerName: 'LP APY',
      minWidth: depositColumns.lpAPY.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<BigNumber>) => {
        return <LPAPY params={params} theme={theme} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'otPoolLiquidity',
      headerName: 'Liquidity',
      minWidth: depositColumns.liquidity.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<BigNumber>) => {
        return <Liquidity params={params} theme={theme} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'otPrice',
      headerName: 'Price',
      minWidth: depositColumns.price.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<BigNumber>) => {
        return <Price params={params} theme={theme} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'otFixedAPR',
      headerName: 'Fixed APR',
      minWidth: depositColumns.fixedAPR.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<BigNumber>) => {
        return <FixedAPR params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'endDate',
      headerName: 'Term',
      minWidth: depositColumns.term.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <Term params={params} theme={theme} />;
      },
      sortable: false,
      disableColumnMenu: true
    }
  ];
};

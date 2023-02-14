import { ethers } from 'ethers';
import { Theme } from '@mui/material';
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid';

import { BigNumber } from 'utils/poolCalc/utils/bignumber';
import { FixedAPR, Liquidity, LPAPY, PoolName, Price, Term, VaultAPY } from 'utils/datagrid/columns/PoolColumns';

export const poolDatagridRowHeight: number = 150;

export const poolColumns = {
  poolName: {
    minWidth: 300
  },
  liquidity: {
    minWidth: 150
  },
  fixedAPR: {
    minWidth: 125
  },
  lpAPY: {
    minWidth: 125
  },
  vaultAPY: {
    minWidth: 125
  },
  price: {
    minWidth: 125
  },
  term: {
    minWidth: 150
  }
};

export const getPoolDatagridColumns = (theme: Theme, selected: number): GridColumns => {
  return [
    {
      field: 'underlyingTokenSymbol',
      headerName: 'Pool Name',
      headerClassName: 'MuiDataGrid-columnHeader--poolName',
      cellClassName: 'MuiDataGrid-cell--poolName',
      minWidth: poolColumns.poolName.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <PoolName params={params} theme={theme} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: selected === 0 ? 'otPoolLiquidity' : 'ytPoolLiquidity',
      headerName: 'Liquidity',
      minWidth: poolColumns.liquidity.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<BigNumber>) => {
        return <Liquidity params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'otFixedAPR',
      headerName: 'Fixed APR',
      minWidth: poolColumns.fixedAPR.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<BigNumber>) => {
        return <FixedAPR params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: selected === 0 ? 'lpApyOt' : 'lpApyYt',
      headerName: 'LP APY',
      minWidth: poolColumns.lpAPY.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<BigNumber>) => {
        return <LPAPY params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'vaultApy',
      headerName: 'Vault APY',
      minWidth: poolColumns.vaultAPY.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<ethers.BigNumber>) => {
        return <VaultAPY params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: selected === 0 ? 'otPrice' : 'ytPrice',
      headerName: 'Price',
      minWidth: poolColumns.price.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<BigNumber>) => {
        return <Price params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'endDate',
      headerName: 'Term',
      minWidth: poolColumns.term.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <Term params={params} theme={theme} />;
      },
      sortable: false,
      disableColumnMenu: true
    }
  ];
};

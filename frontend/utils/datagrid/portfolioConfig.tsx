import { ethers } from 'ethers';
import { Theme } from '@mui/material';
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid';

import { BigNumber } from 'utils/poolCalc/utils/bignumber';
import {
  CurrentValue,
  FixedAPRPositionAPY,
  PoolTokenLiquidity,
  ShareOfPool,
  Term,
  TokenName,
  TotalBalance,
  UnderlyingTokenLiquidity
} from 'utils/datagrid/columns/PortfolioColumns';

export const portfolioCurrentValueSymbol = '$';
export const portfolioDatagridRowHeight: number = 75;

export const portfolioOTYTBalancesColumns = {
  tokenName: {
    minWidth: 400
  },
  fixedAPRPositionAPY: {
    minWidth: 100
  },
  totalBalance: {
    minWidth: 200
  },
  currentValue: {
    minWidth: 200
  },
  term: {
    minWidth: 200
  }
};

export const portfolioLPBalancesColumns = {
  tokenName: {
    minWidth: 450
  },
  poolTokenLiquidity: {
    minWidth: 200
  },
  underlyingTokenLiquidity: {
    minWidth: 200
  },
  shareOfPool: {
    minWidth: 100
  },
  term: {
    minWidth: 150
  }
};

export const getOTYTBalancesColumns = (isOTBalancesDatagrid: boolean, theme: Theme): GridColumns => {
  return [
    {
      field: 'tokenSymbol',
      headerName: 'Token Name',
      headerClassName: 'MuiDataGrid-columnHeader--tokenName',
      cellClassName: 'MuiDataGrid-cell--tokenName',
      minWidth: portfolioOTYTBalancesColumns.tokenName.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <TokenName params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: isOTBalancesDatagrid ? 'otFixedAPR' : 'vaultApy',
      headerName: isOTBalancesDatagrid ? 'Fixed APR' : 'Position APY',
      minWidth: portfolioOTYTBalancesColumns.fixedAPRPositionAPY.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        return <FixedAPRPositionAPY params={params} isOTBalancesDatagrid={isOTBalancesDatagrid} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'balance',
      headerName: 'Total Balance',
      minWidth: portfolioOTYTBalancesColumns.totalBalance.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<ethers.BigNumber>) => {
        return <TotalBalance params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'currentValue',
      headerName: 'Current Value',
      minWidth: portfolioOTYTBalancesColumns.currentValue.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<BigNumber>) => {
        return <CurrentValue params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'endDate',
      headerName: 'Term',
      minWidth: portfolioOTYTBalancesColumns.term.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <Term params={params} theme={theme} />;
      },
      sortable: false,
      disableColumnMenu: true
    }
  ];
};

export const getLPBalancesColumns = (theme: Theme): GridColumns => {
  return [
    {
      field: 'name',
      headerName: 'Token Name',
      headerClassName: 'MuiDataGrid-columnHeader--tokenName',
      cellClassName: 'MuiDataGrid-cell--tokenName',
      minWidth: portfolioLPBalancesColumns.tokenName.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <TokenName params={params} isLPBalancesDatagrid />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'poolTokenLiquidity',
      headerName: 'Pool Token Liquidity',
      minWidth: portfolioLPBalancesColumns.poolTokenLiquidity.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<BigNumber>) => {
        return <PoolTokenLiquidity params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'underlyingTokenLiquidity',
      headerName: 'Underlying Token Liquidity',
      minWidth: portfolioLPBalancesColumns.underlyingTokenLiquidity.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<BigNumber>) => {
        return <UnderlyingTokenLiquidity params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'shareOfPool',
      headerName: 'Share Of Pool',
      minWidth: portfolioLPBalancesColumns.shareOfPool.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<BigNumber>) => {
        return <ShareOfPool params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'endDate',
      headerName: 'Term',
      minWidth: portfolioLPBalancesColumns.term.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <Term params={params} theme={theme} />;
      },
      sortable: false,
      disableColumnMenu: true
    }
  ];
};

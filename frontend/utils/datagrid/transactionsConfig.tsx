import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid';

import { BigNumber } from 'utils/poolCalc/utils/bignumber';
import { Action, Value, TokenIn, TokenOut, EndDate } from 'utils/datagrid/columns/TransactionsColumns';

export const transactionsDatagridRowHeight: number = 75;

export const transactionsColumns = {
  action: {
    minWidth: 350
  },
  value: {
    minWidth: 150
  },
  tokenIn: {
    minWidth: 125
  },
  tokenOut: {
    minWidth: 125
  },
  endDate: {
    minWidth: 50
  }
};

export const getSwapsColumns = (): GridColumns => {
  return [
    {
      field: 'tokenInName',
      headerName: 'Action',
      headerClassName: 'MuiDataGrid-columnHeader--action',
      cellClassName: 'MuiDataGrid-cell--action',
      minWidth: transactionsColumns.action.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <Action params={params} isSwapsDatagrid />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'value',
      headerName: 'Value',
      type: 'number',
      headerClassName: 'MuiDataGrid-columnHeader--value',
      cellClassName: 'MuiDataGrid-cell--value',
      minWidth: transactionsColumns.value.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<BigNumber>) => {
        return <Value params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'tokenInAmount',
      headerName: 'Token In',
      minWidth: transactionsColumns.tokenIn.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <TokenIn params={params} isSwapsDatagrid />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'tokenOutAmount',
      headerName: 'Token Out',
      minWidth: transactionsColumns.tokenOut.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <TokenOut params={params} isSwapsDatagrid />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'endDate',
      headerName: 'Time',
      headerClassName: 'MuiDataGrid-columnHeader--endDate',
      cellClassName: 'MuiDataGrid-cell--endDate',
      headerAlign: 'right',
      align: 'right',
      minWidth: transactionsColumns.endDate.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <EndDate params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    }
  ];
};

export const getLiquidityColumns = (): GridColumns => {
  return [
    {
      field: 'action',
      headerName: 'Action',
      headerClassName: 'MuiDataGrid-columnHeader--action',
      cellClassName: 'MuiDataGrid-cell--action',
      minWidth: transactionsColumns.action.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <Action params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'value',
      headerName: 'Value',
      type: 'number',
      headerClassName: 'MuiDataGrid-columnHeader--value',
      cellClassName: 'MuiDataGrid-cell--value',
      minWidth: transactionsColumns.value.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<BigNumber>) => {
        return <Value params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'token1Amount',
      headerName: 'Token In',
      minWidth: transactionsColumns.tokenIn.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <TokenIn params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'token2Amount',
      headerName: 'Token Out',
      minWidth: transactionsColumns.tokenOut.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <TokenOut params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'endDate',
      headerName: 'Time',
      headerClassName: 'MuiDataGrid-columnHeader--endDate',
      cellClassName: 'MuiDataGrid-cell--endDate',
      headerAlign: 'right',
      align: 'right',
      minWidth: transactionsColumns.endDate.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <EndDate params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    }
  ];
};

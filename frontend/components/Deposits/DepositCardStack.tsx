// libs
import { Box, SelectChangeEvent, Slide, Theme, useTheme } from '@mui/material';
import { DataGrid, GridRowSpacing, GridRowSpacingParams, GridSelectionModel } from '@mui/x-data-grid';
import { darken, lighten } from '@mui/material/styles';
import { NetworkStatus } from '@apollo/client';
import { filter, forEach, forOwn } from 'lodash-es';
import { chain } from 'utils/lodash';

// hooks
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'store/globalStore';
import { getAllActiveEpoches, getRelatedPools } from 'hooks/useDepositGql';
import { useGetAaveAPY, useGetCompoundAPY } from 'hooks/useApyGql';

// utils
import { depositDatagridRowHeight, getDepositDatagridColumns } from 'utils/datagrid';
import { constantStrings } from 'utils/constants';
import { calculateAaveAPY, calculateCompoundAPY, escapeRegExp, getDepositCardData, getSimplePrice } from 'utils';
import { getYearnAPY } from 'utils/getYearnAPY';
import { contract } from 'utils/contracts';
import { CurrencyId, Protocol } from 'enums';
import { getCurrencyPath } from 'constants/currencyPaths';

// UI/components
import SearchBar from 'components/Common/SearchBar';
import DepositCardLoader from 'components/Deposits/DepositCardLoader';
import DepositCardModal from 'components/Modal/DepositCardModal';
import CustomNoRowsOverlay from 'components/Common/CustomNoRowsOverlay';
import { bannerHeight } from 'components/Common/Banner';

const getHoverBackgroundColor = (theme: Theme) =>
  theme.palette.mode === 'dark'
    ? `${darken(theme.palette.info.main, 0.2)}, ${darken(theme.palette.info.dark, 0.5)}`
    : `${lighten(theme.palette.info.light, 0.4)}, ${lighten(theme.palette.info.main, 0.1)}`;

interface IObject {
  [key: string]: any;
}

// contains the list of pool ids from kovan.ts
const poolIds: string[] = [];

// Dictionary of type epochaddress => kovan.ts block
const kovanPoolData: IObject = {};

forEach(contract.epochs, (item) => {
  kovanPoolData[item.address.toLowerCase()] = item;
  poolIds.push(item.otPool.poolId);
  poolIds.push(item.ytPool.poolId);
});

// holds all vault addresses
const vaultAddresses: string[] = [];

forOwn(contract.vaults.yearn, (value, key) => {
  vaultAddresses.push(value);
});

export default function DepositCardStack() {
  const { shouldUpdateDepositCard, showContractBanner } = useStoreState((state) => state);
  const { setShouldUpdateDepositCard } = useStoreActions((action) => action);
  const theme: Theme = useTheme();

  const depositDatagridContainerHeight = `calc(100vh - ${350 + (showContractBanner ? bannerHeight : 0)}px)`;

  const [queryString, setQueryString] = useState<string>('');
  const [selected, setSelected] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [toggleTransition, setToggleTransition] = useState<boolean>(true);
  const [transitionDirection, setTransitionDirection] = useState<any>('left');
  const [rowData, setRowData] = useState<IObject[]>([]);
  const [rate, setRate] = useState<IObject>();
  const [priceRateLoading, setPriceRateLoading] = useState<boolean>(false);
  const [showDepositCardModal, setShowDepositCardModal] = useState<boolean>(false);
  const [underlyingTokenSymbol, setUnderlyingTokenSymbol] = useState<string>('');
  const [otSymbol, setOtSymbol] = useState<string>('');
  const [ytSymbol, setYtSymbol] = useState<string>('');
  const [durationSeconds, setDurationSeconds] = useState<number>(0);
  const [protocol, setProtocol] = useState<string>('');
  const [otAddress, setOtAddress] = useState<string>('');
  const [ytAddress, setYtAddress] = useState<string>('');
  const [streamKey, setStreamKey] = useState<string>('');
  const [underlyingDecimals, setUnderlyingDecimals] = useState<number>(18);
  const [underlying, setUnderlying] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [listItems, setListItems] = useState<IObject[]>([{ label: constantStrings.allProtocols, value: '' }]);
  const [yearnAllData, setYearnAllData] = useState<IObject>();
  const [yearnAllLoading, setYearnAllLoading] = useState<boolean>(false);

  const {
    loading: loadingAllActiveStreams,
    error: errorAllActiveStreams,
    data: dataAllActiveStreams,
    refetch: refetchAllActiveStreams,
    networkStatus: networkStatusAllActiveStreams,
    startPolling: startPollingAllActiveStreams,
    stopPolling: stopPollingAllActiveStreams
  } = getAllActiveEpoches(selectedFilter);

  const {
    loading: loadingPoolStats,
    error: errorPoolStats,
    data: dataPoolStats,
    refetch: refetchPoolStats,
    networkStatus: networkStatusPoolStats,
    startPolling: startPollingPoolStats,
    stopPolling: stopPollingPoolStats
  } = getRelatedPools(poolIds);

  const [
    getAaveAPY,
    {
      loading: loadingAaveAPY,
      error: errorAaveAPY,
      data: dataAaveAPY,
      refetch: refetchAaveAPY,
      networkStatus: networkStatusAaveAPY,
      startPolling: startPollingAaveAPY,
      stopPolling: stopPollingAaveAPY
    }
  ] = useGetAaveAPY();

  const [
    getCompoundAPY,
    {
      loading: loadingCompoundAPY,
      error: errorCompoundAPY,
      data: dataCompoundAPY,
      refetch: refetchCompoundAPY,
      networkStatus: networkStatusCompoundAPY,
      startPolling: startPollingCompoundAPY,
      stopPolling: stopPollingCompoundAPY
    }
  ] = useGetCompoundAPY();

  useEffect(() => {
    let isActive = true;

    const fetchYearnAPY = async (underlyingAddresses) => {
      setYearnAllLoading(false);

      try {
        const dataYearnAPY = await getYearnAPY(underlyingAddresses, vaultAddresses);
        if (!isActive) {
          return;
        }
        setYearnAllData(dataYearnAPY);
      } finally {
        setYearnAllLoading(true);
      }
    };

    if (networkStatusAllActiveStreams === NetworkStatus.ready) {
      const underlyingAddresses = chain(dataAllActiveStreams?.streams)
        .filter((stream: any) => kovanPoolData[stream?.currentEpoch?.address.toLowerCase()])
        .map((stream: any) => stream?.underlying)
        .value();

      // TODO: Fix this vault apy issue
      // getAaveAPY({ variables: { underlyingAddresses } });
      // getCompoundAPY({ variables: { underlyingAddresses } });
      fetchYearnAPY(underlyingAddresses);
    }

    // Clean the state when the component is unmounted
    return () => {
      isActive = false;
      setYearnAllData(null);
    };
  }, [networkStatusAllActiveStreams]);

  useEffect(() => {
    let active = true;

    const fetchSimplePrice = async () => {
      setPriceRateLoading(false);

      try {
        const rate = await getSimplePrice([CurrencyId.DAI, CurrencyId.USDC, CurrencyId.USDT].join(','), CurrencyId.USD);
        if (!active) {
          return;
        }
        setRate(rate);
      } finally {
        setPriceRateLoading(true);
      }
    };

    fetchSimplePrice();
    // Clean the state when the component is unmounted
    return () => {
      active = false;
      setRate(null);
    };
  }, []);

  useEffect(() => {
    if (shouldUpdateDepositCard?.shouldUpdate) {
      refetchAllActiveStreams({
        protocolFilter: selectedFilter
      });
      // Refetch all active streams every 2 seconds after a transaction is performed
      startPollingAllActiveStreams(2000);
      setShouldUpdateDepositCard({
        shouldUpdate: false,
        underlyingAddress: shouldUpdateDepositCard?.underlyingAddress
      });
    }
  }, [shouldUpdateDepositCard]);

  useEffect(() => {
    // TODO: Fix this vault apy issue
    const notSignedInOrUnsupportedNetwork = // networkStatusAaveAPY === NetworkStatus.ready &&
      //   networkStatusCompoundAPY === NetworkStatus.ready &&
      yearnAllLoading;

    if (
      networkStatusAllActiveStreams === NetworkStatus.ready &&
      networkStatusPoolStats === NetworkStatus.ready &&
      notSignedInOrUnsupportedNetwork &&
      priceRateLoading
    ) {
      const balancerPools: IObject = {};
      const aaveAPYData: IObject = {};
      const compoundAPYData: IObject = {};
      const yearnAPYData: IObject = {};

      // * set all of the pool ids
      forEach(dataPoolStats?.pools, (pool: any) => {
        balancerPools[pool?.id] = pool;
      });

      const dataAllActiveStreamsFiltered = filter(
        dataAllActiveStreams?.streams,
        (stream: any) => kovanPoolData[stream?.currentEpoch?.address.toLowerCase()]
      );

      forEach(dataAaveAPY?.reserves, (token: any) => {
        const vaultApy = calculateAaveAPY(token?.liquidityRate);
        aaveAPYData[token?.underlyingAsset.toLowerCase()] = vaultApy;
      });

      forEach(dataCompoundAPY?.markets, (token: any) => {
        const vaultApy = calculateCompoundAPY(token?.supplyRate);
        compoundAPYData[token?.underlyingAddress.toLowerCase()] = vaultApy;
      });

      forEach(yearnAllData, (token: any) => {
        yearnAPYData[token?.token?.address.toLowerCase()] = token?.apy?.net_apy;
      });

      getDepositCardData({
        balancerPools,
        dataAllActiveStreams: dataAllActiveStreamsFiltered,
        aaveAPYData,
        compoundAPYData,
        yearnAPYData,
        kovanPoolData,
        rate
      })
        .then((depositCardData: any) => {
          setRowData((prevRowData: IObject[]) => {
            if (prevRowData && prevRowData.length) {
              const prevRowObject = prevRowData.find(
                (item: IObject) =>
                  shouldUpdateDepositCard?.underlyingAddress?.toLowerCase() === item?.underlying?.toLowerCase()
              );
              const rowObject = depositCardData.find(
                (item: any) =>
                  shouldUpdateDepositCard?.underlyingAddress?.toLowerCase() === item?.underlying?.toLowerCase()
              );
              if (prevRowObject && prevRowObject?.tvl !== rowObject?.tvl) {
                stopPollingAllActiveStreams();
                setShouldUpdateDepositCard({
                  shouldUpdate: false,
                  underlyingAddress: null
                });
              }
            } else if (!selectedFilter) {
              setListItems((prevListItems) => {
                // ? Get the first item since it will be "All Protocols"
                const firstItem = prevListItems.slice(0, 1);
                // ? Return the list containing the protocols retrieved from Graph
                return firstItem.concat(
                  depositCardData.map((rowObject: IObject) => ({
                    label: Protocol[rowObject?.protocol],
                    value: rowObject?.protocol
                  }))
                );
              });
            }

            return depositCardData;
          });
        })
        .catch((error) => {
          console.error('Error from get deposit card data', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [
    networkStatusAllActiveStreams,
    networkStatusPoolStats,
    // TODO: Fix this vault apy issue
    // networkStatusAaveAPY,
    // networkStatusCompoundAPY,
    dataAllActiveStreams,
    yearnAllLoading,
    priceRateLoading
  ]);

  const handleFilterChange = (item: number) => {
    setSelected((prevItem) => {
      if (prevItem !== item) {
        setToggleTransition(false);
        setTransitionDirection(prevItem <= item ? 'left' : 'right');
        setTimeout(() => {
          setToggleTransition(true);
        }, 150);
      }
      setSelectedFilter(listItems[item]?.value);
      return item;
    });
  };

  const getRows = () => {
    if (queryString) {
      const searchRegex = new RegExp(escapeRegExp(queryString), 'i');
      return filter(
        rowData,
        (row: IObject) => searchRegex.test(row?.name.toString()) || searchRegex.test(row?.vault.toString())
      );
    } else {
      return rowData;
    }
  };

  const handleListChange = (e: SelectChangeEvent) => {
    setLoading(true);
    setRowData([]);
    setSelectedFilter(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryString(e.target.value);
  };

  const handleSelectionModelChange = (newSelectionModel: GridSelectionModel) => {
    setSelectionModel(newSelectionModel);
  };

  const handleShowDepositCardModal = (value: boolean) => {
    setShowDepositCardModal(value);
    setSelectionModel([]);
  };

  const resetDepositCardModal = () => {
    setUnderlyingTokenSymbol('');
    setOtSymbol('');
    setYtSymbol('');
    setDurationSeconds(0);
    setProtocol('');
    setOtAddress('');
    setYtAddress('');
    setStreamKey('');
    setUnderlying('');
    setUnderlyingDecimals(18);
  };

  const handleRowClick = (params, event, details) => {
    resetDepositCardModal();
    setUnderlyingTokenSymbol(params?.row?.name);
    setOtSymbol(params?.row?.otSymbol);
    setYtSymbol(params?.row?.ytSymbol);
    setDurationSeconds(params?.row?.durationSeconds);
    setProtocol(params?.row?.protocol);
    setOtAddress(params?.row?.otAddress);
    setYtAddress(params?.row?.ytAddress);
    setStreamKey(params?.row?.streamKey);
    setUnderlying(params?.row?.underlying);
    setUnderlyingDecimals(params?.row?.underlyingDecimals);
    setShowDepositCardModal(true);
  };

  return (
    <>
      <SearchBar
        onSearchChange={handleSearchChange}
        listSelectedValue={selectedFilter}
        listItems={listItems}
        onListChange={handleListChange}
      />
      {/* <div className="mt-3 ml-10">
        <Tabs selectedValue={selected} onSelected={handleFilterChange} list={list} />
      </div> */}

      {showDepositCardModal && (
        <DepositCardModal
          showDialog={showDepositCardModal}
          setShowDialog={handleShowDepositCardModal}
          underlyingTokenSymbol={underlyingTokenSymbol}
          otSymbol={otSymbol}
          ytSymbol={ytSymbol}
          durationSeconds={durationSeconds}
          protocol={protocol}
          otAddress={otAddress}
          ytAddress={ytAddress}
          streamKey={streamKey}
          underlying={underlying}
          underlyingDecimals={underlyingDecimals}
        />
      )}
      <Slide direction={transitionDirection} in={toggleTransition} timeout={150} mountOnEnter unmountOnExit>
        <Box
          sx={{
            height: depositDatagridContainerHeight,
            '& .unreal-app-theme--table-card': {
              marginBottom: theme.typography.pxToRem(2),
              bgcolor: theme.unreal.card.backgroundColor,
              boxShadow: '0px 10px 100px rgba(0, 0, 0, 0.06)',
              border: 0,
              borderRadius: theme.typography.pxToRem(8),
              maxHeight: 'none !important',
              cursor: 'pointer'
            }
          }}
        >
          <DataGrid
            sx={{
              border: 0,
              '& .MuiDataGrid-cell': {
                borderBottom: 'none'
              },
              '& .MuiDataGrid-cell:focus': {
                outline: 'none'
              },
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: 'none'
              },
              '& .MuiDataGrid-columnHeader--stream, & .MuiDataGrid-cell--stream': {
                pl: theme.spacing(3)
              },
              '& .MuiDataGrid-columnSeparator': {
                visibility: 'hidden'
              },
              '& .MuiDataGrid-row': {
                '&:hover': {
                  background: (_theme) => `linear-gradient(135deg, ${getHoverBackgroundColor(_theme)})`
                }
              }
            }}
            columns={getDepositDatagridColumns(theme)}
            rows={getRows()}
            onRowClick={handleRowClick}
            getRowClassName={(_params) => `unreal-app-theme--table-card`}
            hideFooter
            rowHeight={depositDatagridRowHeight}
            getRowSpacing={(params: GridRowSpacingParams): GridRowSpacing => ({ top: 0, bottom: 20 })}
            onSelectionModelChange={handleSelectionModelChange}
            selectionModel={selectionModel}
            components={{ LoadingOverlay: DepositCardLoader, NoRowsOverlay: CustomNoRowsOverlay }}
            componentsProps={{
              loadingOverlay: { theme, rowHeight: depositDatagridRowHeight },
              noRowsOverlay: { noRowsMessage: 'No Results' }
            }}
            loading={loadingAllActiveStreams || loadingPoolStats || loading}
          />
        </Box>
      </Slide>

      {errorPoolStats || errorAllActiveStreams ? <div>{constantStrings.error}</div> : null}
    </>
  );
}

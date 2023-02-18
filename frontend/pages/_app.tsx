import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'styles/globals.css';

import type { AppProps } from 'next/app';

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { createStore, StoreProvider } from 'easy-peasy';
import { ApolloProvider } from '@apollo/client';
import { createTheme, ThemeProvider } from '@mui/material';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import globalStore, { useStoreActions } from 'store/globalStore';
import { StoreModel } from 'store/model';
import { useStoreState } from 'store/typedHooks';
import { useApollo } from '@app-apollo-client';
import getDesignTokens from '@app-theme';
import { getEthereumProviderLibrary, getItem } from 'utils';
import { showRedirectNetworkToast, showUnsupportedNetworkToast } from 'utils/showToast';
import { ToastContext } from 'context/toastContext';
import { APP_REDIRECT_NETWORK, SUPPORTED_NETWORKS } from 'constants/networkNames';
import { useNetwork } from 'hooks/ethereum';

import StructureComponent from 'components/Structure/Structure';

function InneryielderApp({ Component, pageProps }: AppProps) {
  const mode = useStoreState((state) => state.theme.mode);
  const setTheme = useStoreActions((actions) => actions.setTheme);
  const { setToastData } = useContext(ToastContext);
  const { library } = useWeb3React<Web3Provider>();
  const network = useNetwork(library);

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  // useEffect(() => {
  //   if (network && !(network in SUPPORTED_NETWORKS)) {
  //     showUnsupportedNetworkToast(setToastData);
  //     if (network === APP_REDIRECT_NETWORK) {
  //       showRedirectNetworkToast(setToastData);
  //     }
  //   }
  // }, [network]);

  useEffect(() => {
    if (getItem('theme')) {
      setTheme(getItem('theme'));
    }
  }, [setTheme]);

  return (
    <ThemeProvider theme={theme}>
      <StructureComponent>
        <Component {...pageProps} />
      </StructureComponent>
    </ThemeProvider>
  );
}

// * initiate the store
const store = createStore<StoreModel>(globalStore);

// * this is the main setup file where all the top level library injections happen
function yielderApp({ Component, pageProps }: AppProps) {
  // * initiate apollo
  const apolloClient = useApollo(pageProps);
  const [toastdata, setToastData] = useState();
  const [showConnectWalletModal, setShowConnectWalletModal] = useState<boolean>(false);
  const value = { toastdata, setToastData, showConnectWalletModal, setShowConnectWalletModal };

  return (
    <StoreProvider store={store}>
      <Web3ReactProvider getLibrary={getEthereumProviderLibrary}>
        <ToastContext.Provider value={value}>
          <ApolloProvider client={apolloClient}>
            <InneryielderApp Component={Component} {...pageProps}></InneryielderApp>
          </ApolloProvider>
        </ToastContext.Provider>
      </Web3ReactProvider>
    </StoreProvider>
  );
}

export default yielderApp;

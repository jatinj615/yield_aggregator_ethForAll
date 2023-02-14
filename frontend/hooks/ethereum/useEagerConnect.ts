import { useState, useEffect, useContext } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { activateConnector, injectedConnector, getWalletConnectConnector } from 'utils/ethereum';
import { getSessionItem } from 'utils';
import { showUnsupportedNetworkToast } from 'utils/showToast';
import { ToastContext } from 'context/toastContext';

export function useEagerConnect(): boolean {
  const { activate, active } = useWeb3React<Web3Provider>();
  const [tried, setTried] = useState<boolean>(false);
  const { setToastData } = useContext(ToastContext);

  useEffect(() => {
    const eagerConnect = async () => {
      try {
        const provider = await injectedConnector.getProvider();
        const isInjectedConnectorAuthorized = !!provider?.selectedAddress
          ? await injectedConnector.isAuthorized()
          : false;

        // In case a MetaMask connection is already active
        if (isInjectedConnectorAuthorized && getSessionItem('isWalletConnected')) {
          await activateConnector(injectedConnector, activate, setTried(true));
        }
        // In case a Wallet Connect connection is already active
        else if (getSessionItem('isWalletConnected')) {
          await activateConnector(getWalletConnectConnector(), activate, setTried(true));
        } else {
          setTried(true);
        }
      } catch (error) {
        console.error('Error from useEagerConnect', error);
        if (error instanceof UnsupportedChainIdError) {
          showUnsupportedNetworkToast(setToastData);
        }
      }
    };

    eagerConnect();
  }, []); // intentionally only running on mount (make sure it's only mounted once)

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

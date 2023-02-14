import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ChainId } from 'enums';
import { INFURA_GOERLI_HTTP_URL, INFURA_MAINNET_HTTP_URL, DEFAULT_CHAIN_IDS } from 'constants/chainIds';
import { setSessionItem } from 'utils/storage';

/**
 * The 'injected' connector refers to plugin-based wallets like MetaMask, which
 * inject it's client library into the window object.
 */
export const injectedConnector = new InjectedConnector({
  supportedChainIds: DEFAULT_CHAIN_IDS
});

/**
 * WalletConnect.  This provides access to many mobile wallets that use the wallet connect protocol
 * like Rainbow, Argent etc.  Note that once this connector is closed, it can't be reopened so we
 * need to create a new instance to try to connect again.
 */
export function getWalletConnectConnector(): WalletConnectConnector {
  const walletConnectConnector = new WalletConnectConnector({
    rpc: {
      [ChainId.MAINNET]: INFURA_MAINNET_HTTP_URL,
      [ChainId.GOERLI]: INFURA_GOERLI_HTTP_URL
    }
  });
  return walletConnectConnector;
}

export const activateConnector = async (
  connector: InjectedConnector | WalletConnectConnector,
  activateActiveConnector,
  onError?
) => {
  await activateActiveConnector(connector, onError, true);
  setSessionItem('isWalletConnected', true);
};

export const handleConnectToMetaMask = async (activateActiveConnector, deactivateActiveConnector) => {
  await deactivateActiveConnector();
  await activateConnector(injectedConnector, activateActiveConnector, deactivateActiveConnector);
};

export const handleConnectToWalletConnect = async (activateActiveConnector, deactivateActiveConnector) => {
  await deactivateActiveConnector();
  await activateConnector(getWalletConnectConnector(), activateActiveConnector, deactivateActiveConnector);
};

export const handleCloseWalletConnection = async (deactivateActiveConnector) => {
  await deactivateActiveConnector();
  setSessionItem('isWalletConnected', false);
};

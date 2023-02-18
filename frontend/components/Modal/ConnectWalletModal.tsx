import React, { useContext } from 'react';
import Image from 'next/image';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Theme,
  Typography,
  useTheme
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import {
  handleCloseWalletConnection,
  handleConnectToMetaMask as connectToMetaMask,
  handleConnectToWalletConnect as connectToWalletConnect
} from 'utils/ethereum';
import {
  showAlreadyProcessingRequestToast,
  showMetamaskInstallationToast,
  showUnsupportedNetworkToast,
  showUserRejectedRequestToast
} from 'utils/showToast';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { Web3Provider } from '@ethersproject/providers';
import { ToastContext } from 'context/toastContext';

import MetamaskIcon from 'assets/svg/metamask.svg';
import WalletConnectIcon from 'assets/svg/wallet-connect-icon.svg';

const BootstrapDialogTitle = (props: any) => {
  const { children, onClose, theme, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, px: 6, py: 3, backgroundColor: theme.yielder.modal.buttonContainerBackgroundColor }}
      {...other}
    >
      <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
        {children}
        {onClose ? (
          <Grid item>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                marginRight: -1,
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        ) : null}
      </Grid>
    </DialogTitle>
  );
};

export default function ConnectWalletModal() {
  const theme: Theme = useTheme();
  const { setToastData, setShowConnectWalletModal, showConnectWalletModal } = useContext(ToastContext);
  const {
    activate: activateActiveConnector,
    deactivate: deactivateActiveConnector,
    active
  } = useWeb3React<Web3Provider>();

  const hideDialog = () => {
    setShowConnectWalletModal(false);
  };

  const resetApp = async () => {
    await handleCloseWalletConnection(deactivateActiveConnector);
  };

  const handleConnectToMetaMask = async () => {
    try {
      await connectToMetaMask(activateActiveConnector, deactivateActiveConnector);
    } catch (error) {
      console.error('Error from connect wallet using MetaMask', error);
      const { ethereum } = window as any;
      if (typeof ethereum === 'undefined') {
        showMetamaskInstallationToast(setToastData);
      } else if (error instanceof UnsupportedChainIdError) {
        showUnsupportedNetworkToast(setToastData);
      } else if (error instanceof UserRejectedRequestErrorInjected) {
        showUserRejectedRequestToast(setToastData);
      } else if ((error as any).code === -32002) {
        showAlreadyProcessingRequestToast(setToastData);
      }
    }
    hideDialog();
  };

  const handleConnectToWalletConnect = async () => {
    try {
      await connectToWalletConnect(activateActiveConnector, deactivateActiveConnector);
    } catch (error) {
      console.error('Error from connect wallet using WalletConnect', error);
      if (error instanceof UnsupportedChainIdError) {
        showUnsupportedNetworkToast(setToastData);
      } else if (error instanceof UserRejectedRequestErrorWalletConnect) {
        showUserRejectedRequestToast(setToastData);
      } else if ((error as any).code === -32002) {
        showAlreadyProcessingRequestToast(setToastData);
      }
    }
    hideDialog();
  };

  return (
    <Dialog
      open={showConnectWalletModal}
      onClose={hideDialog}
      sx={{
        '& .MuiDialog-paper': {
          background: theme.yielder.modal.backgroundColor,
          borderRadius: theme.typography.pxToRem(16)
        }
      }}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={hideDialog} theme={theme}>
        <Grid item>
          <Typography fontWeight="bold" fontSize={theme.typography.pxToRem(20)}>
            Select a wallet provider
          </Typography>
        </Grid>
      </BootstrapDialogTitle>
      <DialogContent sx={{ p: 6, mt: 4 }}>
        <Button
          variant="outlined"
          disabled={!active}
          sx={{
            padding: theme.typography.pxToRem(18),
            textTransform: 'none'
          }}
          size="large"
          onClick={resetApp}
          startIcon={<CloseIcon />}
          fullWidth
        >
          Close wallet connection
        </Button>
        <Grid py={4} container alignItems="center" justifyContent="space-between" wrap="nowrap" gap={4}>
          <Grid container item xs={6} direction="column" alignItems="center">
            <Button
              aria-label="metamask"
              color="inherit"
              sx={{ flexDirection: 'column', textTransform: 'none' }}
              onClick={handleConnectToMetaMask}
            >
              <Image src={MetamaskIcon} alt="metamask icon" height="150" width="150" />
              MetaMask
            </Button>
          </Grid>
          <Grid container item xs={6} direction="column" alignItems="center">
            <Button
              aria-label="wallet connect"
              color="inherit"
              sx={{ flexDirection: 'column', textTransform: 'none' }}
              onClick={handleConnectToWalletConnect}
            >
              <Image src={WalletConnectIcon} alt="wallet connect icon" height="150" width="150" />
              WalletConnect
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

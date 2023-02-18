import * as React from 'react';
import SnackbarComponent from 'components/Common/SnackbarComponent';
import ToastComponent from 'components/Common/ToastComponent';
import ConnectWalletModal from 'components/Modal/ConnectWalletModal';

const CommonLayout = () => {
  return (
    // common layout schema
    <>
      <SnackbarComponent />
      <ToastComponent />
      <ConnectWalletModal />
    </>
  );
};

export default CommonLayout;

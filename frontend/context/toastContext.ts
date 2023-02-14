import React, { Dispatch, SetStateAction } from 'react';

export interface ToastDataInterface {
  toastData: any;
  // * button specific
  primaryButtonType?: 'BUTTON' | 'ANCHOR';
  secondaryButtonType?: 'BUTTON' | 'ANCHOR';
  buttonActionType?: 'DISMISS';
  primaryButtonText?: string;
  secondaryButtonText?: string;
  linkType?: 'INTERNAL' | 'EXTERNAL';
  link?: string;
  timeoutID?: any;

  // * alert specific
  title?: string;
  severity?: 'success' | 'info' | 'warning' | 'error' | 'loading';
}

export interface ToastContextInterface {
  toastData?: {
    [key: string]: ToastDataInterface[];
  };
  setToastData?: Dispatch<SetStateAction<ToastDataInterface>>;
  showConnectWalletModal?: boolean;
  setShowConnectWalletModal?: Dispatch<SetStateAction<boolean>>;
}

// * ToastContext to get and set toast specific data
export const ToastContext = React.createContext<ToastContextInterface>({});

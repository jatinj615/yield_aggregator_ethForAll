import { PaletteMode } from '@mui/material';
import { Action } from 'easy-peasy';

// TODO store needs comments
export interface StoreModel {
  // * theme store
  theme: { mode: PaletteMode };

  // * app specific items
  shouldUpdate: boolean;
  shouldUpdateDepositCard: any;
  currentToken: 'DAI' | 'USDT' | 'USDC';
  showContractBanner: boolean;

  // actions
  setTheme: Action<StoreModel, PaletteMode>;
  setShouldUpdate: Action<StoreModel, boolean>;
  setShouldUpdateDepositCard: Action<StoreModel, any>;
  setCurrentToken: Action<StoreModel, string>;
  setShowContractBanner: Action<StoreModel, boolean>;
}

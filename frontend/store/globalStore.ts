import { PaletteMode } from '@mui/material';
import { action, createTypedHooks } from 'easy-peasy';
import { StoreModel } from './model';

// TODO: store needs comments
const globalStore: StoreModel = {
  // theme: { mode: 'light' },
  theme: { mode: 'dark' },

  shouldUpdate: false,
  shouldUpdateDepositCard: { shouldUpdate: false, underlyingAddress: null },
  currentToken: 'DAI',

  // actions
  setTheme: action((state, payload: PaletteMode) => {
    state.theme.mode = payload;
  }),

  setShouldUpdate: action((state, payload: boolean) => {
    state.shouldUpdate = payload;
  }),

  setShouldUpdateDepositCard: action((state, payload: any) => {
    state.shouldUpdateDepositCard = payload;
  }),

  setCurrentToken: action((state, payload: 'DAI' | 'USDT' | 'USDC') => {
    state.currentToken = payload;
  }),
};

export default globalStore;

const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>();
export { useStoreActions, useStoreState };

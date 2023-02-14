import { CurrencySymbol } from 'enums';

const CURRENCY_BASE_PATH: string = '/png/currencies';

const DAI = CurrencySymbol['DAI'];
const USD_COIN = CurrencySymbol['USD COIN'];
const USDT = CurrencySymbol['USDT'];
const AETHDAI = CurrencySymbol['aEthDAI'];
const YVDAI = CurrencySymbol['yvDAI'];
const CUSDC = CurrencySymbol['cUSDC'];

interface CurrencyPath {
  [DAI]: string;
  [USD_COIN]: string;
  [USDT]: string;
  [AETHDAI]: string;
  [YVDAI]: string;
  [CUSDC]: string;
}

const CurrencyPaths: Readonly<CurrencyPath> = {
  [DAI]: '/dai-logo.png',
  [USD_COIN]: '/usd-coin-usdc-logo.png',
  [USDT]: '/tether-usdt-logo.png',
  [AETHDAI]: '/aave-dai-logo.png',
  [YVDAI]: '/yearn-finance-yfi-logo.png',
  [CUSDC]: '/compound-usd-coin-cusdc-logo.png'
};

export const getCurrencyPath = (symbol: string): string => {
  return `${CURRENCY_BASE_PATH}${CurrencyPaths[symbol]}`;
};

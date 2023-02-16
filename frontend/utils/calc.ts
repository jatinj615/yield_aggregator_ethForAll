import { ethers, Signer } from 'ethers';
import moment from 'moment';
import { BigNumber, ZERO, ONE, bnum } from './poolCalc/utils/bignumber';
import { numberConstants } from './constants';
import { intlFormatNumber } from 'utils/formatNumber';
import { CurrencyId, CurrencySymbol } from 'enums';

export const getConversionRate = (rate, symbol) => {
  const currencySymbol = CurrencySymbol[symbol?.toUpperCase()];
  const currencyId = CurrencyId[currencySymbol];
  return currencyId ? rate?.[currencyId]?.[CurrencyId.USD] : 0;
};

export const isIncorrectNumberFormat = (param) => {
  const format = /[!@#$%^&*()_+\-=e\[\]{};':"\\|,<>\/?]+/;
  return format.test(param);
};

export const escapeRegExp = (value: string): string => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

export const getEnumKeyByEnumValue = (myEnum, enumValue): string => {
  return Object.keys(myEnum).find((x) => myEnum[x] == enumValue);
};


import { join, slice, split, toNumber, toString } from 'lodash-es';

/**
 * To truncate the decimals places upto a specified value in a number
 * @param {number | string} value
 * @param {number} noOfDecimals
 * @returns {string} formattedNumber
 */
export const formatNumber = (value: number | string, noOfDecimals: number = 3): string => {
  // * First convert float to a string, safely
  let stringNumber = toString(value);
  // * Split it with decimal
  const splitNumber = split(stringNumber, '.');
  // * Truncate the decimals to the number of digits that you want without rounding it off
  splitNumber[1] = join(slice(split(splitNumber[1], ''), 0, noOfDecimals), '').padEnd(noOfDecimals, '0');
  // * Join them back
  if (splitNumber && splitNumber.length && splitNumber[1] && splitNumber[1].length) {
    stringNumber = join(splitNumber, '.');
  }
  return stringNumber;
};

/**
 * To get the integer value from a string containing an integer
 * @param {string} value
 * @returns {string} integerFromString
 */
export const getIntegerFromString = (value: string): string => {
  return value && value.replace(/[^\d.]/g, '');
};

/**
 * To truncate the decimals places upto a specified value in a number using internationalization
 * @param {number | string} value
 * @param {number} noOfDecimals
 * @returns {string} formattedNumber
 */
export function intlFormatNumber(value: number | string, noOfDecimals: number = 3): string {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: noOfDecimals,
    maximumFractionDigits: noOfDecimals
  }).format(toNumber(value));
}

import { filter, groupBy, map, mapValues, orderBy, sortBy, toPairs } from 'lodash-es';

// just add here the lodash functions you want to support
const chainableFunctions = {
  map,
  filter,
  toPairs,
  orderBy,
  groupBy,
  sortBy
};

export const chain = <T>(input: T) => {
  let value: any = input;
  const wrapper = {
    ...mapValues(chainableFunctions, (f: any) => (...args: any[]) => {
      // lodash always puts input as the first argument
      value = f(value, ...args);
      return wrapper;
    }),
    value: () => value
  };
  return wrapper;
};

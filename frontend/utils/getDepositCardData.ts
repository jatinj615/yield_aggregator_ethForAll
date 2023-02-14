// * get aggregate deposit card data
import { map } from 'lodash-es';
import { Protocol } from 'enums';

interface IObject {
  [key: string]: any;
}

export const getDepositCardData = ({
  aaveData
}) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // * get the deposit card data
    try {
      const depositCardData = map(aaveData, (row: any) => {
        return createMintRowObject(row);
      });

      // * return the values
      resolve(depositCardData);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * To create mint row object
 * @param stream
 * @param vaultApy
 * @param balancerPools
 * @param kovanPoolData
 * @param rate
 * @returns mintRowObject
 */
const createMintRowObject = (row) => {
  const mintRowObject: IObject = {};

  mintRowObject.name = row.name;
  mintRowObject.symbol = row.name;
  mintRowObject.totalLiquidity = row.totalLiquidity;
  mintRowObject.liquidityRate = row.liquidityRate;
  mintRowObject.chain_name = row.chain_name;
  mintRowObject.underlyingAddress = row.underlyingAsset;
  mintRowObject.id = row.aToken.id;
  mintRowObject.yield_percentage = row.yield_percentage;

  return mintRowObject;
};

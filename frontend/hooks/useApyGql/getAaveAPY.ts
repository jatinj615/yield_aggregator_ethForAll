import { gql, useLazyQuery } from '@apollo/client';
import { AaveClient } from 'lib/apollo-client';

export const useGetAaveAPY = () => {
  const query = gql`
    query getAaveApy($underlyingAddresses: [String!]!) {
      reserves(where: { underlyingAsset_in: $underlyingAddresses, usageAsCollateralEnabled: true }) {
        name
        liquidityRate
        underlyingAsset
        pool {
          lendingPool
        }
      }
    }
  `;

  return useLazyQuery(query, {
    client: AaveClient
  });
};

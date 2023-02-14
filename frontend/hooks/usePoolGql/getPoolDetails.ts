import { gql, useQuery } from '@apollo/client';

export const getPoolDetails = (poolId: string) => {
  const query = gql`
    query getPoolDetails($poolId: String!) {
      pools: pools(where: { id: $poolId }, first: 1) {
        id
        address
        name
        poolType
        tokens {
          symbol
          address
          balance
          priceRate
          name
          weight
          decimals
        }
        totalSwapFee
        symbol
        swapFee
        createTime
        totalShares
        tokensList
        expiryTime
        unitSeconds
        principalToken
        baseToken
        totalWeight
      }
    }
  `;

  return useQuery(query, {
    variables: {
      poolId
    },
    context: { endPointB: true }
  });
};

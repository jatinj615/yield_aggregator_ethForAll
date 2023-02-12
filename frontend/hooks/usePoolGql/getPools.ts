import { gql, useQuery } from '@apollo/client';

export const getPools = (poolIds: string[]) => {
  const query = gql`
    query getPools($poolIds: [String!]!) {
      otpools: pools(where: { poolType: "Unreal", id_in: $poolIds }) {
        id
        address
        name
        tokens {
          symbol
          address
          balance
          priceRate
          name
          decimals
        }
        totalSwapFee
        symbol
      }
      ytpools: pools(where: { poolType: "Weighted", id_in: $poolIds }) {
        id
        address
        name
        tokens {
          symbol
          address
          balance
          priceRate
          name
          decimals
        }
        totalSwapFee
        symbol
      }
    }
  `;

  return useQuery(query, {
    variables: {
      poolIds
    },
    context: { endPointB: true }
  });
};

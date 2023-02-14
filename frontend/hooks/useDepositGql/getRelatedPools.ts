import { gql, useQuery } from '@apollo/client';

export const getRelatedPools = (poolIds: string[]) => {
  const query = gql`
    query getRelatedPools($id: [String!]!) {
      pools(where: { id_in: $id }) {
        id
        address
        name
        poolType
        totalShares
        totalSwapFee
        tokens {
          symbol
          address
          balance
          priceRate
          name
          decimals
        }
      }
    }
  `;

  return useQuery(query, {
    variables: {
      id: poolIds
    },
    context: { endPointB: true },
    fetchPolicy: 'no-cache'
  });
};

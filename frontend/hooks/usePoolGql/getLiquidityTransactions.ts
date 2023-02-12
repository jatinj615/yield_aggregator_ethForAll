import { gql, useQuery } from '@apollo/client';

export const useGetLiquidityTransactions = (poolId: string) => {
  const query = gql`
    query getLiquidityTransactions($poolId: String!) {
      joinExits(where: { poolId: $poolId }, orderBy: timestamp, orderDirection: desc) {
        id
        tx
        type
        token1
        token1Sym
        tokenAmount1
        token2
        token2Sym
        tokenAmount2
        timestamp
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

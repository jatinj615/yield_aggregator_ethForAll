import { gql, useQuery } from '@apollo/client';

export const useGetSwapTransactions = (poolId: string) => {
  const query = gql`
    query getSwapTransactions($poolId: String!) {
      pool(id: $poolId) {
        swaps: swaps(orderBy: timestamp, orderDirection: desc) {
          id
          tx
          tokenIn
          tokenAmountIn
          tokenInSym
          tokenOut
          tokenAmountOut
          tokenOutSym
          timestamp
        }
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

import { gql, useQuery } from '@apollo/client';

export const getRelatedEpochs = (epochIds: string[]) => {
  const query = gql`
    query getRelatedEpochs($epochIds: [String!]!) {
      epoches(where: { address_in: $epochIds }) {
        startTimestamp
        address
        number
        tvl
        interestBearingSymbol
        vaultApy
        yieldToken {
          name
          address
          symbol
        }
        otToken {
          name
          address
          symbol
        }
        stream {
          tokenSymbol
          durationSeconds
          protocol
          underlying
          meta
          underlyingDecimals
        }
      }
    }
  `;

  return useQuery(query, {
    variables: {
      epochIds
    },
    context: { endPointA: true }
  });
};

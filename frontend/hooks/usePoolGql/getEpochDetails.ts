import { gql, useQuery } from '@apollo/client';

export const getEpochDetails = (epochAddress: string) => {
  const query = gql`
    query getEpochDetails($epochAddress: String) {
      epoches: epoches(where: { address: $epochAddress }) {
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
          meta
          durationSeconds
          protocol
          underlying
          underlyingDecimals
        }
      }
    }
  `;

  return useQuery(query, {
    variables: {
      epochAddress
    },
    context: { endPointA: true }
  });
};

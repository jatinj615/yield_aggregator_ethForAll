import { gql, useQuery } from '@apollo/client';

export const getAllActiveEpoches = (protocolFilter: string) => {
  const query = gql`
    query getAllActiveEpoches($protocolFilter: String!) {
      streams: streams(where: { protocol_contains: $protocolFilter }) {
        currentEpoch {
          startTimestamp
          address
          number
          tvl
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
          interestBearingSymbol
          vaultApy
        }
        meta
        tokenSymbol
        id
        durationSeconds
        protocol
        underlying
        underlyingDecimals
      }
    }
  `;

  return useQuery(query, {
    variables: {
      protocolFilter
    },
    context: { endPointA: true }
  });
};

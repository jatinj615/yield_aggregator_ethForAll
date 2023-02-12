import { gql, useLazyQuery } from '@apollo/client';
import { CompoundClient } from 'lib/apollo-client';

export const useGetCompoundAPY = () => {
  const query = gql`
    query getCompoundAPY($underlyingAddresses: [Bytes!]!) {
      markets(where: { underlyingAddress_in: $underlyingAddresses }) {
        name
        supplyRate
        symbol
        underlyingAddress
      }
    }
  `;

  return useLazyQuery(query, {
    client: CompoundClient
  });
};

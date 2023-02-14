import { gql, useLazyQuery } from '@apollo/client';

/**
 * Returns the past 7 days pool data where pool0 is today's pool and pool7 is the pool 7 days ago
 * @param {string} poolId
 * @param {number} latestBlockNumber
 * @param {number} blocksPerDay
 * @returns {any} pastPools
 */
export const useGetPastPools = (poolId: string, latestBlockNumber: number, blocksPerDay: number = 6325): any => {
  const query = gql`
    query getPastPools(
      $poolId: String!
      $blockNumberPool1: Int!
      $blockNumberPool2: Int!
      $blockNumberPool3: Int!
      $blockNumberPool4: Int!
      $blockNumberPool5: Int!
      $blockNumberPool6: Int!
      $blockNumberPool7: Int!
    ) {
      pool0: pool(id: $poolId) {
        totalSwapVolume
        tokens {
          address
          balance
        }
      }
      pool1: pool(id: $poolId, block: { number: $blockNumberPool1 }) {
        totalSwapVolume
        tokens {
          address
          balance
        }
      }
      pool2: pool(id: $poolId, block: { number: $blockNumberPool2 }) {
        totalSwapVolume
        tokens {
          address
          balance
        }
      }
      pool3: pool(id: $poolId, block: { number: $blockNumberPool3 }) {
        totalSwapVolume
        tokens {
          address
          balance
        }
      }
      pool4: pool(id: $poolId, block: { number: $blockNumberPool4 }) {
        totalSwapVolume
        tokens {
          address
          balance
        }
      }
      pool5: pool(id: $poolId, block: { number: $blockNumberPool5 }) {
        totalSwapVolume
        tokens {
          address
          balance
        }
      }
      pool6: pool(id: $poolId, block: { number: $blockNumberPool6 }) {
        totalSwapVolume
        tokens {
          address
          balance
        }
      }
      pool7: pool(id: $poolId, block: { number: $blockNumberPool7 }) {
        totalSwapVolume
        tokens {
          address
          balance
        }
      }
    }
  `;

  return useLazyQuery(query, {
    variables: {
      poolId,
      blockNumberPool1: latestBlockNumber - blocksPerDay * 1,
      blockNumberPool2: latestBlockNumber - blocksPerDay * 2,
      blockNumberPool3: latestBlockNumber - blocksPerDay * 3,
      blockNumberPool4: latestBlockNumber - blocksPerDay * 4,
      blockNumberPool5: latestBlockNumber - blocksPerDay * 5,
      blockNumberPool6: latestBlockNumber - blocksPerDay * 6,
      blockNumberPool7: latestBlockNumber - blocksPerDay * 7
    },
    context: { endPointB: true }
  });
};

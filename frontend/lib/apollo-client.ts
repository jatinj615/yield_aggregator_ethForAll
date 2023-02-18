import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink, NormalizedCacheObject } from '@apollo/client';
import { isEqual, merge } from 'lodash-es';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  const ourServer = new HttpLink({
    uri: process.env.NEXT_PUBLIC_yielder_SUBGRAPH_URL,
    credentials: 'same-origin'
  });
  const balancerserver = new HttpLink({
    uri: process.env.NEXT_PUBLIC_BALANCER_SUBGRAPH_URL,
    credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
  });

  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.split(
      (operation) => operation.getContext().endPointA,
      ourServer, // <= apollo will send to this if clientName is "balancer"
      balancerserver // <= otherwise will send to this
    ),
    cache: new InMemoryCache()
  });

  return client;
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: any[], sourceArray: any[]) => [
        ...sourceArray,
        ...destinationArray.filter((d: any) => sourceArray.every((s: any) => !isEqual(d, s)))
      ]
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client: { cache: { extract: () => any } }, pageProps: { props: { [x: string]: any } }) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export const AaveClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_AAVE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  cache: new InMemoryCache()
});

export const CompoundClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_COMPOUND_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  cache: new InMemoryCache()
});

export function useApollo(pageProps: { [x: string]: any }) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}

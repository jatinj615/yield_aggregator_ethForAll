import { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';

/**
 * gets the network.  NOTE: this should only be used at Page level components so that
 * lower level components don't need to know about Web3Context.
 * @param library web3provider that has a getNetwork() function
 * @returns {string} Network
 */
export function useNetwork(library: Web3Provider | undefined): string {
  const [network, setNetwork] = useState<string>('');

  useEffect(() => {
    let active = true;

    const fetchNetwork = async () => {
      try {
        const network = await library?.getNetwork();
        if (!active) {
          return;
        }
        setNetwork(network?.name);
      } catch (error) {
        console.error('Error from getNetwork API', error);
        throw new Error(error.message);
      }
    };

    fetchNetwork();
    // Clean the state when the component is unmounted
    return () => {
      active = false;
      setNetwork('');
    };
  }, [library]);

  return network;
}

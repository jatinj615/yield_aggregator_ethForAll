import { filter, includes } from 'lodash-es';

export const getYearnAPY = async (underlyingAddresses: string[], vaultAddresses: string[]) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_YEARN_API_URL);
    const data = await response.json();
    return filter(
      data,
      (token) =>
        token?.endorsed &&
        !token?.emergency_shutdown &&
        includes(underlyingAddresses, token?.token?.address.toLowerCase()) &&
        includes(vaultAddresses, token?.address)
    );
  } catch (error) {
    console.log('Error from yearnApy yearnAll API', error);
  }
};

export const getSimplePrice = async (targetCurrencyId: string, baseCurrencyId: string) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${targetCurrencyId}&vs_currencies=${baseCurrencyId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error from coinGecko simplePrice API', error);
  }
};

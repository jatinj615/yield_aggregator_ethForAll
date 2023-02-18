export const getConnextData = async (fromChainId, toChainId, amount) => {
    try {
        const response = await fetch(
            'https://www.zucco.in/?fromChain='+fromChainId+'&toChain='+toChainId+'&amount='+amount
        );
        const data = await response.json();
        return data;
        } catch (error) {
            console.log('Error from sdk api(Call Shivam)', error);
        }
};
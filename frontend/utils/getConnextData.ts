export const getConnextData = async (fromChainId, toChainId, amount) => {
    try {
        const response = await fetch(
            '//13.232.31.152:3000/?fromChain='+fromChainId+'&toChain='+toChainId+'&amount='+amount
        );
        const data = await response.json();
        return data;
        } catch (error) {
            console.log('Error from sdk api(Call Shivam)', error);
        }
};
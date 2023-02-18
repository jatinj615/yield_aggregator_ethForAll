export const getAaveData = async () => {
    try {
        const response = await fetch(
            `https://06mmfe1l86.execute-api.ap-south-1.amazonaws.com/development/v1/subgraph`
        );
        const data = await response.json();
        return data.data;
        } catch (error) {
            console.log('Error from lamda api(Call Nilansh)', error);
        }
};
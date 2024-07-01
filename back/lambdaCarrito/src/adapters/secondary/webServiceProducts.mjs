import axios from 'axios';

export const productWebService = async (stage, idProduct) => {
    const config = {
        method: 'GET',
        url: `https://yfcyqimbv1.execute-api.us-east-2.amazonaws.com/${stage}/producto/${idProduct}`,
        headers: { 
            'Content-Type': 'application/json'
        },
    };

    try {
        const response = await axios(config);
        const amount = response.data.amount;
        return amount;
    } catch (error) {
        throw new Error(JSON.stringify(error.response ? error.response.data : 'Error in productWebService'));
    }
};




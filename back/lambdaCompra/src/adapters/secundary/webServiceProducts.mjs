import axios from 'axios';

const config = {
    method: 'PUT',
    url: 'https://yfcyqimbv1.execute-api.us-east-2.amazonaws.com/dev/producto',
    headers: { 
        'Content-Type': 'application/json'
    },
    data: {}
}

export const productWebService = async (body) => {
    const jsonObj = JSON.parse(body);
    config.data = jsonObj.products;
    try {
        const response = await axios(config);
        const responseData = response.data;
        return responseData;
        
    } catch (error) {
        throw new Error(error.response ? error.response.data : 'Error in productWebService');
    }
};

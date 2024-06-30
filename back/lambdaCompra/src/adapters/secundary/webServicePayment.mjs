import axios from 'axios';

const config = {
    method: 'POST',
    url: 'https://82jtxn1b80.execute-api.us-east-1.amazonaws.com/prod/payment',
    headers: { 
        'x-api-key': 'h987iSR9bEmcZTZBQWgh5QSN6EvRyNn1A0Gy91gj',
        'Content-Type': 'application/json'
    },
    data: {}
}

export const paymentWebService = async (body) => {
    const jsonObj = JSON.parse(body);
    config.data = jsonObj.paymentData;

    try {
        const response = await axios(config);
        const responseData = response.data;

        // Verifica si la respuesta es 'SUCCESS' o 'FAIL'
        if (responseData === 'SUCCESS') {
            return { status: 'SUCCESS', message: 'Payment validated successfully' };
        } else if (responseData === 'FAIL') {
            return { status: 'FAIL', message: 'Payment validation failed' };
        } else {
            return { status: 'UNKNOWN', message: 'Unknown status from payment service' };
        }
    } catch (error) {
        throw new Error(error.response ? error.response.data : 'Error validating payment');
    }
};

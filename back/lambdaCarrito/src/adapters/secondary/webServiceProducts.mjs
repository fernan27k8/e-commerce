import axios from 'axios';

export const productWebService = async (stage, body) => {
    const data = JSON.parse(body);
    const idProducto = data.idProducto;
    const config = {
        method: 'GET',
        url: `https://yfcyqimbv1.execute-api.us-east-2.amazonaws.com/${stage}/producto/${idProducto}`,
        headers: { 
            'Content-Type': 'application/json'
        },
    };

    try {
        const response = await axios(config);
        const responseData = response.data;
        const resData = JSON.parse(responseData);
        console.log("ResponseData",responseData);
        console.log("ResponseData",resData.amount);

        // Asumiendo que responseData ya es un objeto y no una cadena JSON
        const dataProduct = responseData;

        if (data.amount <= resData.amount) {
            return {
                status: 'SUCCESS',
                data: dataProduct,
            };
        } else {
            return {
                status: 'FAILURE',
                message: 'Producto insuficiente',
            };
        }
    } catch (error) {
        throw new Error(JSON.stringify(error.response ? error.response.data : 'Error in productWebService'));
    }
};




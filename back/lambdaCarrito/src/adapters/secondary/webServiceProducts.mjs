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

        // Asumimos que la respuesta contiene un array de objetos en data
        const productData = response.data.find(item => item.SK === idProduct);

        if (productData) {
            const amount = productData.amount;
            return amount;
        } else {
            throw new Error(`Producto con id ${idProduct} no encontrado.`);
        }
    } catch (error) {
        throw new Error(JSON.stringify(error.response ? error.response.data : 'Error in productWebService'));
    }
};




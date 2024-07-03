import axios from 'axios';

export const productWebService = async (body, xMytoken, stage) => {
    const config = {
        method: 'PUT',
        url: `https://yfcyqimbv1.execute-api.us-east-2.amazonaws.com/${stage}/producto`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${xMytoken}`
        },
        data: {}
    };

    console.log(stage)

    try {
        const jsonObj = JSON.parse(body);
        config.data = jsonObj.products;

        const response = await axios(config);
        return response.data;

    } catch (error) {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.error('Error response:', error.response.data);
            throw new Error(`Error in productWebService: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.error('No response received:', error.request);
            throw new Error('Error in productWebService: No response received');
        } else {
            // Algo ocurrió en la configuración de la solicitud que desencadenó un error
            console.error('Error in setting up request:', error.message);
            throw new Error(`Error in productWebService: ${error.message}`);
        }
    }
};

/*import axios from 'axios';

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

    // Verificar código de estado de la respuesta (opcional)
    if (response.status !== 200) {
      throw new Error(`Error en la petición del producto: código de estado ${response.status}`);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      // Error en la respuesta del servicio (código de estado diferente a 2xx)
      const errorMsg = `Error en la petición del producto: ${error.response.data.message || error.response.statusText}`;
      throw new Error(errorMsg);
    } else {
      // Error de red o general
      throw new Error('Error al obtener información del producto');
    }
  }
};*/
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

    // Verificar código de estado de la respuesta (opcional)
    if (response.status !== 200) {
      throw new Error(`Error en la petición del producto: código de estado ${response.status}`);
    }

    // Parsear manualmente la respuesta JSON
    const responseData = JSON.parse(response.data);

    // Verificar si la propiedad "amount" existe
    if (!responseData.amount) {
      throw new Error('Error en la respuesta del producto: falta propiedad "amount"');
    }

    // Extraer la cantidad
    const amount = parseInt(responseData.amount);

    return {
      amount: amount,
      // Extraer otros datos necesarios del objeto responseData
    };
  } catch (error) {
    if (error.response) {
      // Error en la respuesta del servicio (código de estado diferente a 2xx)
      const errorMsg = `Error en la petición del producto: ${error.response.data.message || error.response.statusText}`;
      throw new Error(errorMsg);
    } else {
      // Error de red o general
      throw new Error('Error al obtener información del producto');
    }
  }
};





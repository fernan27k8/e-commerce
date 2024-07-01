import { addCart } from "../../adapters/secondary/dynamodb.mjs";
import { productWebService } from "../../adapters/secondary/webServiceProducts.mjs";

export const addCarritoRepository = async (idUsuario, idCarrito, body, stage) => {
    let response = {};

    try {
        // Llamada al web service para obtener la información del producto
        const responseProduct = await productWebService(stage, body);

        if (responseProduct.status === "SUCCESS") {
            // Agregar el producto al carrito
            response = await addCart(idUsuario, idCarrito, JSON.stringify(responseProduct.data), stage);
        } else {
            response = {
                statusCode: 400,
                body: JSON.stringify({ message: responseProduct.message || "Web service error" }),
            };
        }
    } catch (error) {
        response = {
            statusCode: 500,
            body: JSON.stringify({ message: error.message || "Error in addCarritoRepository" }),
        };
    }

    return response;
};


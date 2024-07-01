import { addCart } from "../../adapters/secondary/dynamodb.mjs";
import { productWebService } from "../../adapters/secondary/webServiceProducts.mjs";

export const addCarritoRepository = async (idUsuario, idCarrito, body, stage) => {
    let response = {};
    requestBody = JSON.parse(body);
    try {
        // Llamada al web service para obtener la información del producto
        const responseProduct = await productWebService(stage, requestBody.idProduct);

        if (responseProduct >= requestBody.amount) {
            // Agregar el producto al carrito
            response = await addCart(idUsuario, idCarrito, body, stage);
        } else {
            response = {
                status: "ERROR",
                body: JSON.stringify({ message: "Productos insuficientes" }),
            };
        }
    } catch (error) {
        response = {
            status: "ERROR",
            body: JSON.stringify({ message: error.message || "Error in addCarritoRepository" }),
        };
    }

    return response;
};


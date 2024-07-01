import {updateCart} from "../../adapters/secondary/dynamodb.mjs"
export const updateCarritoRepository = async(idUsuario,idCarrito,body,stage) =>{
    let response = {};
    requestBody = JSON.parse(body);
    try {
        // Llamada al web service para obtener la información del producto
        const responseProduct = await productWebService(stage, requestBody.idProduct);

        if (responseProduct >= requestBody.amount) {
            // Modificar l acantidad en el carrito
            response = await updateCart(idUsuario, idCarrito, body, stage);
        } else {
            response = {
                status: "ERROR",
                body: JSON.stringify({ message: "Productos insuficientes" }),
            };
        }
    } catch (error) {
        response = {
            status: "ERROR",
            body: JSON.stringify({ message: error.message || "Error in updateCarritoRepository" }),
        };
    }

    return response;
}
import { addCart } from "../../adapters/secondary/dynamodb.mjs";
import { productWebService } from "../../adapters/secondary/webServiceProducts.mjs";

export const addCarritoRepository = async (idUsuario, idCarrito, body, stage,xMytoken) => {
    let response = {};
    const requestBody = JSON.parse(body);
    try {
        // Llamada al web service para obtener la información del producto
        const responseProduct = await productWebService(stage, requestBody.idProducto,xMytoken);
        const amountProduct = Number(responseProduct.amount);
        const amountReq = Number(requestBody.amount);
        console.log("AmountReq:",amountReq);
        console.log("amountProduct: ",amountProduct);
        const price = amountProduct * Number(responseProduct.price);
        if (amountProduct >= amountReq) {
            // Agregar el producto al carrito
            console.log("llegue");
            response = await addCart(idUsuario, idCarrito, body, price, stage);
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


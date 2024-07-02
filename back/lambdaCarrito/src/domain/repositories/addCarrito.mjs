import { addCart } from "../../adapters/secondary/dynamodb.mjs";
import { productWebService } from "../../adapters/secondary/webServiceProducts.mjs";

export const addCarritoRepository = async (idUsuario, idCarrito, body, stage) => {
    let response = {};
    const requestBody = JSON.parse(body);
    try {
        // Llamada al web service para obtener la información del producto
        const responseProduct = await productWebService(stage, requestBody.idProducto);
        let amountProduct = Number(responseProduct.amount);
        let amountReq = Number(requestBody.amount);
        let priceProduct = Number(responseProduct.price);
        let price = priceProduct * amountReq;
        console.log("amountProduct: ",amountProduct);
        if (amountProduct >= amountReq) {
            // Agregar el producto al carrito
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


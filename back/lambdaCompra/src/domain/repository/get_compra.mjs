import { getCompra } from "../../adapters/secundary/dynamodb.mjs";

export const getCompraRepository = async (stage, idUsuario, idCarrito) => {
    let response = {};
     
    response = await getCompra(stage, idUsuario, idCarrito);

    return response;
}
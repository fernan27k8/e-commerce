import { getCompra } from "../../adapters/secundary/dynamodb.mjs";

export const getCompraRepository = async (stage, idCompra, body) => {
    let response = {};
     
    response = await getCompra(stage, idCompra, body);

    return response;
}
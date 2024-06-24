import { addCompra } from "../../adapters/secundary/dynamodb.mjs";


export const addCompraRepository = async (stage, body) => {
    let response = {};
     
    response = await addCompra(stage, body);

    return response;
}
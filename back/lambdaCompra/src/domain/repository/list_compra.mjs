import { listCompras } from "../../adapters/secundary/dynamodb.mjs";

export const listComprasRepository = async (stage, body) => {
    let response = {};

    response = await listCompras(stage, body);

    return response;
}
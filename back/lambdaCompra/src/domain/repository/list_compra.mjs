import { listCompras } from "../../adapters/secundary/dynamodb.mjs";

export const listComprasRepository = async (stage, idUsuario) => {
    let response = {};

    response = await listCompras(stage, idUsuario);

    return response;
}
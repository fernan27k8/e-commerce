import {listComprasRepository} from "../repository/list_compra.mjs"

export const listComprasUC = async(stage, idUsuario) => {
    let response = {};
    const product = listComprasRepository(stage, idUsuario);
    response = product;
    return response;
}
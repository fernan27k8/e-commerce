import {listComprasRepository} from "../repository/list_compra.mjs"

export const listComprasUC = async(stage, body) => {
    let response = {};
    const product = listComprasRepository(stage, body);
    response = product;
    return response;
}
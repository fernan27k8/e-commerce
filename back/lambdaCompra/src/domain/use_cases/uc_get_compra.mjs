import {getCompraRepository} from "../repository/get_compra.mjs"

export const getCompraUC = async(stage, idCompra, body) => {
    let response = {}; 
    const products = getCompraRepository(stage, idCompra, body);
    response = products;
    
    return response;
}
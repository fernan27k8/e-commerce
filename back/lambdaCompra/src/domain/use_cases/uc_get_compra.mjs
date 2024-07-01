import {getCompraRepository} from "../repository/get_compra.mjs"

export const getCompraUC = async(stage, idUsuario, idCarrito) => {
    let response = {}; 
    const products = getCompraRepository(stage, idUsuario, idCarrito);
    response = products;
    
    return response;
}
import { addCompraRepository } from "../repository/add_compra.mjs";

export const addCompraUC = async(stage, id_usuario, id_carrito, body, xMytoken) => {
    let response = {}; 
    const products = addCompraRepository(stage, id_usuario, id_carrito, body, xMytoken);
    response = products;
    
    return response;
}
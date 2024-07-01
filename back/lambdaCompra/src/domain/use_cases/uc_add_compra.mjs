import { addCompraRepository } from "../repository/add_compra.mjs";

export const addCompraUC = async(stage, id_usuario, id_carrito, body) => {
    let response = {}; 
    const products = addCompraRepository(stage, id_usuario, id_carrito, body);
    response = products;
    
    return response;
}
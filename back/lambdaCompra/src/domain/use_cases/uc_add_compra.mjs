import { addCompraRepository } from "../repository/add_compra.mjs";

export const addCompraUC = async(stage, body) => {
    let response = {}; 
    const products = addCompraRepository(stage, body);
    response = products;
    
    return response;
}
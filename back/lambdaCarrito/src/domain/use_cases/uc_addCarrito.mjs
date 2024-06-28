import { addCarritoRepository } from "../repositories/addCarrito.mjs";
export const addCarritoUC = async(body,stage,token) =>{
    let response = {};
    response = addCarritoRepository(body,stage);
    return response;
}
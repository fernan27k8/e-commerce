import { addCarritoRepository } from "../repositories/addCarrito.mjs";
export const addCarritoUC = async(idCarrito,body,stage,token) =>{
    let response = {};
    response = addCarritoRepository(idCarrito,body,stage);
    return response;
}
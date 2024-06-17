import { deleteCarritoRepository } from "../repositories/deleteCarrito.mjs";
export const deleteCarritoUC = async(idCarrito,stage,token) =>{
    let response = {};
    response = deleteCarritoRepository(idCarrito,stage);
    return response;
}
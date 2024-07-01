import { addCarritoRepository } from "../repositories/addCarrito.mjs";
export const addCarritoUC = async(idUsuario,idCarrito,body,stage,token) =>{
    let response = {};
    response = addCarritoRepository(idUsuario,idCarrito,body,stage);
    return response;
}
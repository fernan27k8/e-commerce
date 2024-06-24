import { addCarritoRepository } from "../repositories/addCarrito.mjs";
export const addCarritoUC = async(carrito,stage,token) =>{
    let response = {};
    response = addCarritoRepository(carrito,stage);
    return response;
}
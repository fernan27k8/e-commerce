import { updateCarritoRepository } from "../repositories/updateCarrito.mjs";
export const updateCarritoUC = async(idCarrito,body,stage,token) =>{
    let response = {};
    const carrito = updateCarritoRepository(idCarrito,body,stage);
    response = carrito;
    return response;
}
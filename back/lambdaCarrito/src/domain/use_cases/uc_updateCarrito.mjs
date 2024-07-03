import { updateCarritoRepository } from "../repositories/updateCarrito.mjs";
export const updateCarritoUC = async(idUsuario,idCarrito,body,stage,token) =>{
    let response = {};
    const carrito = updateCarritoRepository(idUsuario,idCarrito,body,stage,token);
    response = carrito;
    return response;
}
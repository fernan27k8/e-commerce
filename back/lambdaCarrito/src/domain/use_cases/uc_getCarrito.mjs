import { getCarritoRepository } from "../repositories/getCarrito.mjs";
export const getCarritoUC = async(idUsuario,idCarrito,body,stage,token) =>{
    let response = {};
    const carrito = await getCarritoRepository(idUsuario,idCarrito,body,stage)
    response = carrito;
    return response;
}
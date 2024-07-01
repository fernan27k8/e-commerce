import { getCarritoRepository } from "../repositories/getCarrito.mjs";
export const getCarritoUC = async(idUsuario,idCarrito,stage,token) =>{
    let response = {};
    const carrito = await getCarritoRepository(idUsuario,idCarrito,stage)
    response = carrito;
    return response;
}
import { getCarritoRepository } from "../repositories/getCarrito.mjs";
export const getCarritoUC = async(idCarrito,stage,token) =>{
    let response = {};
    const carrito = await getCarritoRepository(idCarrito,stage)
    response = carrito;
    return response;
}
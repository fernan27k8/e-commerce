import { getCarritoRepository } from "../repositories/getCarrito.mjs";
export const getCarritoUC = async(idCarrito,body,stage,token) =>{
    let response = {};
    const carrito = await getCarritoRepository(idCarrito,body,stage)
    response = carrito;
    return response;
}
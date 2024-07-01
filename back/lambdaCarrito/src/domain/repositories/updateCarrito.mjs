import {updateCart} from "../../adapters/secondary/dynamodb.mjs"
export const updateCarritoRepository = async(idUsuario,idCarrito,body,stage) =>{
    let response = {};
    response = await updateCart(idUsuario,idCarrito,body,stage);
    return response;
}
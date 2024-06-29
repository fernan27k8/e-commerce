import {updateCart} from "../../adapters/secondary/dynamodb.mjs"
export const updateCarritoRepository = async(idCarrito,body,stage) =>{
    let response = {};
    response = await updateCart(idCarrito,body,stage);
    return response;
}
import {addCart} from "../../adapters/secondary/dynamodb.mjs"
export const addCarritoRepository = async(idCarrito,body,stage) =>{
    let response = {};
    response = await addCart(idCarrito,body,stage);
    return response;
}
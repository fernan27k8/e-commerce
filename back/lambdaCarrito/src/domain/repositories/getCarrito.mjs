import { getCart } from "../../adapters/secondary/dynamodb.mjs";
export const getCarritoRepository = async(idCarrito,body,stage) =>{
    let response = {};
    response = await getCart(idCarrito,body,stage);
    return response;
}
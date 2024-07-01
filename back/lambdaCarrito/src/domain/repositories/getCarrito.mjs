import { getCart } from "../../adapters/secondary/dynamodb.mjs";
export const getCarritoRepository = async(idUsuario,idCarrito,body,stage) =>{
    let response = {};
    response = await getCart(idUsuario,idCarrito,body,stage);
    return response;
}
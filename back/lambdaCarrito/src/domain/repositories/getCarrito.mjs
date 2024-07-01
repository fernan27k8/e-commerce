import { getCart } from "../../adapters/secondary/dynamodb.mjs";
export const getCarritoRepository = async(idUsuario,idCarrito,stage) =>{
    let response = {};
    response = await getCart(idUsuario,idCarrito,stage);
    return response;
}
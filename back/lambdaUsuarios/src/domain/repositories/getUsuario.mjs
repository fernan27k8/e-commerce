import { getUser } from "../../adapters/secondary/dynamodb.mjs";

export const getUsuarioRepository = async(usuario,stage) =>{
    let response = {};
    response = await getUser(usuario,stage);
    return response;
}
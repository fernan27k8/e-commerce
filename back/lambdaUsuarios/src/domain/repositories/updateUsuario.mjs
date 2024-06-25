import { putUser } from "../../adapters/secondary/dynamodb.mjs";

export const updateUsuarioRepository = async(usuario,stage) =>{
    let response = {};
    response = await putUser(usuario,stage);
    return response;
}
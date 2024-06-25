import { addUser } from "../../adapters/secondary/dynamodb.mjs";

export const addUsuarioRepository = async(usuario,stage) =>{
    let response = {};
    response = await addUser(usuario,stage);
    return response;
}
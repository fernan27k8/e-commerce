import {updateUsuarioRepository} from "../repositories/updateUsuario.mjs";
export const updateUsuarioUC = async(usuario,stage,token) =>{
    let response = {};
    const users = updateUsuarioRepository(usuario,stage);
    response = users;
    return response;
}
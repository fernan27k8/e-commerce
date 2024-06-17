import {updateUsuarioRepository} from "../repositories/updateUsuario.mjs";
export const updateUsuarioUC = async(idUsuario,body,stage,token) =>{
    let response = {};
    const usuario = updateUsuarioRepository(idUsuario,body,stage);
    response = usuario;
    return response;
}
import {deleteUsuarioRepository} from "../repositories/deleteUsuario.mjs";
export const deleteUsuarioUC = async(idUsuario,stage,token) =>{
    let response = {};
    response = deleteUsuarioRepository(idUsuario,stage);
    return response;
}
import {getUsuarioRepository} from "../repositories/getUsuario.mjs";
export const getUsuarioUC = async(idUsuario,stage,token) =>{
    let response = {};
    const usuario = await getUsuarioRepository(idUsuario,stage)
    response = usuario;
    return response;
}
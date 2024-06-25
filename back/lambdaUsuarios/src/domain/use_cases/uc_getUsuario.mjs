import {getUsuarioRepository} from "../repositories/getUsuario.mjs";
export const getUsuarioUC = async(usuario,stage,token) =>{
    let response = {};
    const usuario = await getUsuarioRepository(usuario,stage)
    response = usuario;
    return response;
}
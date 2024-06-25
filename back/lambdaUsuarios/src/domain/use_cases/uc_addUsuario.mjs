import { addUsuarioRepository } from "../repositories/addUsuario.mjs";
export const addUsuarioUC = async(usuario,stage,token) =>{
    let response = {};
    const users = addUsuarioRepository(usuario,stage);
    response = users;
    return response;
}
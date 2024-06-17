export const updateUsuarioRepository = async(idUsuario,body,stage) =>{
    let response = {};
    response = await updateUsuario(idUsuario,body,stage);
    return response;
}
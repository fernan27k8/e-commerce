export const deleteUsuarioRepository = async(idUsuario,stage) =>{
    let response = {};
    response = await deleteUsuario(idUsuario,stage);
    return response;
}
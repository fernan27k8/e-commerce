export const getUsuarioRepository = async(idUsuario,stage) =>{
    let response = {};
    response = await getUsuario(idUsuario,stage);
    return response;
}
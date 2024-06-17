export const getUsuarioUC = async(idUsuario,stage,token) =>{
    let response = {};
    const usuario = await getUsuarioRepository(idUsuario,stage)
    response = usuario;
    return response;
}
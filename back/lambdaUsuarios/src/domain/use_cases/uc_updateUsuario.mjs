export const updateUsuarioUC = async(idusuario,body,stage,token) =>{
    let response = {};
    const usuario = updateUsuarioRepository(idusuario,body,stage);
    response = usuario;
    return response;
}
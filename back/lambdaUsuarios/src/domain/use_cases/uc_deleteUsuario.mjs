export const deleteUsuarioUC = async(idusuario,stage,token) =>{
    let response = {};
    response = deleteUsuarioRepository(idusuario,stage);
    return response;
}
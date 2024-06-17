export const addUsuarioUC = async(usuario,stage,token) =>{
    let response = {};
    response = addUsuarioRepository(usuario,stage);
    return response;
}
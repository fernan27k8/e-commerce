export const addUsuarioRepository = async(usuario,stage) =>{
    let response = {};
    response = await addUsuario(usuario,stage);
    return response;
}
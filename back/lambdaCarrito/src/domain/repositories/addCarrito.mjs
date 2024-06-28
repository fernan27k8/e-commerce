export const addCarritoRepository = async(body,stage) =>{
    let response = {};
    response = await addCarrito(body,stage);
    return response;
}
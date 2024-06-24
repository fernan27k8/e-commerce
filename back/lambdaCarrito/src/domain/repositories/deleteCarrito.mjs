export const deleteCarritoRepository = async(idCarrito,stage) =>{
    let response = {};
    response = await deleteCarrito(idCarrito,stage);
    return response;
}
export const getCarritoRepository = async(idCarrito,stage) =>{
    let response = {};
    response = await getCarrito(idCarrito,stage);
    return response;
}
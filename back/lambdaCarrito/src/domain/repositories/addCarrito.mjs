export const addCarritoRepository = async(carrito,stage) =>{
    let response = {};
    response = await addCarrito(carrito,stage);
    return response;
}
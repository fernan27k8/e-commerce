import {listProductsRepository} from "../repository/list_products.mjs"

export const listProductsUC = async(stage) => {
    let response = {}; 
    const products = listProductsRepository(stage);
    response = products;
    
    return response;
}
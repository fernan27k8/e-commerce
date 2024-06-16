import {getProductRepository} from "../repository/get_products.mjs"

export const getProductUC = async(idProduct, stage) => {
    console.log("UC Stage: ", stage);
    let response = {};
    const product = getProductRepository(idProduct, stage);
    response = product;
    return response;
}
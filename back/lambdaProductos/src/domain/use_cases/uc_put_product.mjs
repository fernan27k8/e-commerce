import { updateProductsRepository } from "../repository/update_products.mjs";

export const updateProductsUC = async(stage, body) => {
    console.log("UC Stage: ", stage);
    let response = {};
    const product = updateProductsRepository(stage, body);
    response = product;
    return response;
}
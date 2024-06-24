import { getProduct } from "../../adapters/secundary/dynamodb.mjs";

export const getProductRepository = async (idProduct, stage) => {
    console.log("Repo Stage: ", stage);
    let response = {};

    response = await getProduct(idProduct, stage);

    return response;
}
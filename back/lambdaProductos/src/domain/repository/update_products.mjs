import { updateProducts } from "../../adapters/secundary/dynamodb.mjs";

export const updateProductsRepository = async (stage, body) => {
    console.log("Repo Stage: ", stage);
    let response = {};

    response = await updateProducts(stage, body);

    return response;
}
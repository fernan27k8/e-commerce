import { queryProducts } from "../../adapters/secundary/dynamodb.mjs";

export const listProductsRepository = async (stage) => {
    let response = {};
     
    response = await queryProducts(stage);

    return response;
}
import { createUser } from "../../adapters/secondary/cognito.mjs";
import { addUser } from "../../adapters/secondary/dynamodb.mjs";

export const createUserRepository = async (stage, body) => {
    let response = {};
    response = await createUser(body);
    await addUser(body,response.body,stage);
    return response;
}
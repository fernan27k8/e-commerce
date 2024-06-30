import { createUser } from "../../adapters/secondary/cognito.mjs";

export const createUserRepository = async (stage, body) => {
    let response = {};

    response = await createUser(body);

    return response;
}
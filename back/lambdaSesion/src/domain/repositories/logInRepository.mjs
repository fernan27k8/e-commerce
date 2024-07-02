import { logIn } from "../../adapters/secondary/cognito.mjs";
export const logInRepository = async (stage, body) => {
    let response = {};
    response = await logIn(body,stage);
    return response;
}
import { logOut } from "../../adapters/secondary/cognito.mjs";
export const logOutRepository = async (stage,xMytoken,refreshToken) => {
    let response = {};
    response = await logOut(xMytoken, refreshToken);
    return response;
}
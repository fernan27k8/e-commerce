import { logOutRepository } from "../repositories/logOutRepository.mjs";

export const logOutUser = async(stage, xMytoken, refreshToken) => {
    let response = {}; 
    const user = logOutRepository(stage,xMytoken, refreshToken);
    response = user;
    
    return response;
}
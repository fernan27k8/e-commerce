import { logInRepository } from "../repositories/logInRepository.mjs";

export const logInUser = async(stage, body) => {
    let response = {}; 
    const user = logInRepository(stage,body);
    response = user;
    
    return response;
}
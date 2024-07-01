import { createUserRepository } from "../repositories/createUserRepositoy.mjs";

export const registerUser = async(stage, body) => {
    let response = {}; 
    const user = createUserRepository(stage, body);
    response = user;
    
    return response;
}
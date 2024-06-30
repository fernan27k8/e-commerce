import { createUserRepository } from "../repositories/createUserRepositoy.mjs";

export const registerUser = async(stage, body) => {
    let response = {}; 
    const products = createUserRepository(stage, body);
    response = products;
    
    return response;
}
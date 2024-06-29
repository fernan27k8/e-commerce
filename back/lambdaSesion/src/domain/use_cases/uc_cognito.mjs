const cognitoRepository = require('../repositories/cognitoRepositoy.mjs');

module.exports = {
  login: async (loginData) => {
    const loginResult = await cognitoRepository.loginUser(loginData);
    return loginResult;
  },

  registerUser: async (userData) => {
    const registerResult = await cognitoRepository.registerUser(userData);
    return registerResult;
  },

  logout: async () => {
    await cognitoRepository.globalSignOut();
  },
};
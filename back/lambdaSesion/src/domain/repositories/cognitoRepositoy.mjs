const cognitoAdapter = require('../adapters/cognito/cognitoAdapter');

module.exports = {
  registerUser: async (userData) => {
    return await cognitoAdapter.registerUser(userData);
  },

  loginUser: async (loginData) => {
    const cognitoAuthResult = await cognitoAdapter.loginUser(loginData);
    return {
      user: cognitoAuthResult.User,
      accessToken: cognitoAuthResult.Authentication.IdToken,
    };
  },

  validateToken: async (token) => {
    return await cognitoAdapter.validateToken(token);
  },

  refreshAccessToken: async (refreshToken) => {
    return await cognitoAdapter.refreshAccessToken(refreshToken);
  },

  globalSignOut: async () => {
    return await cognitoAdapter.globalSignOut();
  },
};
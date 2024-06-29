const AWS = require('aws-sdk');
const cognitoIdentity = new AWS.CognitoIdentityServiceProvider();

module.exports = {
  registerUser: async (userData) => {
    const params = {
      ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
      Password: userData.password,
      Username: userData.username,
    };

    try {
      const result = await cognitoIdentity.signUp(params).promise();
      console.log('Usuario registrado correctamente:', result);
      return result;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  },

  loginUser: async (loginData) => {
    const params = {
      ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
      Password: loginData.password,
      Username: loginData.username,
    };

    try {
      const result = await cognitoIdentity.initiateAuth(params).promise();
      console.log('Usuario autenticado correctamente:', result);
      return result;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  },

  validateToken: async (token) => {
    const params = {
      AccessToken: token,
    };

    try {
      const result = await cognitoIdentity.getUserInfo(params).promise();
      console.log('Token validado correctamente:', result);
      return result;
    } catch (error) {
      console.error('Error al validar token:', error);
      throw error;
    }
  },

  refreshAccessToken: async (refreshToken) => {
    const params = {
      ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
      RefreshToken: refreshToken,
    };

    try {
      const result = await cognitoIdentity.refreshAccessToken(params).promise();
      console.log('Token de acceso actualizado correctamente:', result);
      return result;
    } catch (error) {
      console.error('Error al actualizar el token de acceso:', error);
      throw error;
    }
  },

  globalSignOut: async () => {
    const params = {
      ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
      GlobalSignOut: true,
    };

    try {
      const result = await cognitoIdentity.globalSignOut(params).promise();
      console.log('Cierre de sesión global realizado correctamente:', result);
      return result;
    } catch (error) {
      console.error('Error al cerrar sesión globalmente:', error);
      throw error;
    }
  },
};

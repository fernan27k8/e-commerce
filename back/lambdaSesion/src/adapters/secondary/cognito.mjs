import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminSetUserPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({ region: "us-east-2" });
const USER_POOL_ID = 'us-east-2_vUuuGCj2W';
const COGNITO_USER_POOL_CLIENT_ID = `6e4puvndqb2kirmv9fpnu0ujq`;

export const createUser = async (body) => {
    const data = JSON.parse(body);

    const createUserParams = {
        UserPoolId: USER_POOL_ID,
        Username: data.email,
        UserAttributes: [
            {
                Name: 'email',
                Value: data.email
            },
            {
                Name: 'email_verified',
                Value: 'true'
            }
        ],
        TemporaryPassword: data.password,
        MessageAction: 'SUPPRESS'
    };

    const setPasswordParams = {
        Password: data.password,
        UserPoolId: USER_POOL_ID,
        Username: data.email,
        Permanent: true
    };

    try {
        // Crear el usuario
        const usuario = await cognitoClient.send(new AdminCreateUserCommand(createUserParams));

        // Establecer la contraseña permanente para el usuario
         await cognitoClient.send(new AdminSetUserPasswordCommand(setPasswordParams));

         const userId = usuario.User.Username;
         const responseBody = {
            message: 'User created successfully'
         }
         responseBody.userId = userId;
        return {
            statusCode: 201,
            body: JSON.stringify(responseBody)
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Error creating user',
                error: error.message
            })
        };
    }
};

export const logIn = async (body) => {
  const { Username, Password } = JSON.parse(body);

  const authParams = {
    AuthFlow: "USER_PASSWORD_AUTH",
    AuthType: "EMAIL",
    UserPoolId: USER_POOL_ID,
    ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
    AuthParameters: {
      EMAIL: Username,
      PASSWORD: Password
    }
  };

  try {
    const authResponse = await cognitoClient.send(new AdminInitiateAuthCommand(authParams));

    if (authResponse.ChallengeName === 'CUSTOM_CHALLENGE') {
      // Manejo del desafío OTP (opcional)
      // ... implementar lógica para manejar el envío y verificación del OTP ...
    } else {
      // Autenticación exitosa sin desafío OTP
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Login successful'
        })
      };
    }
  } catch (error) {
    // Manejo de errores de inicio de sesión
    if (error.code === "UserNotFound" || error.code === "NotAuthorizedException") {
      // Manejo de escenarios de correo electrónico no válido o no verificado
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Invalid email or unverified email. Please check your email and verify if necessary.'
        })
      };
    } else if (error.code === "PasswordResetRequiredException") {
      // Manejo de error de contraseña requerida para reinicio
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Password reset required. Please follow the instructions sent to your email to reset your password.'
        })
      };
    } else if (error.code === "AccountTemporarySuspendedException") {
      // Manejo de error de cuenta suspendida temporalmente
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Your account has been temporarily suspended. Please contact support for assistance.'
        })
      };
    } else {
      // Manejo de otros errores genéricos de inicio de sesión
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Login failed',
          error: error.message
        })
      };
    }
  }
};



import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminSetUserPasswordCommand, InitiateAuthCommand} from "@aws-sdk/client-cognito-identity-provider";
import { getUser } from "../secondary/dynamodb.mjs"
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

export const logIn = async (body, stage) => {
    try {
        const data = JSON.parse(body);

        const authParams = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: COGNITO_USER_POOL_CLIENT_ID,
            AuthParameters: {
                'USERNAME': data.email,
                'PASSWORD': data.password
            }
        };

        const authResult = await cognitoClient.send(new InitiateAuthCommand(authParams));

        // Verificar AuthenticationResult antes de continuar
        if (!authResult.AuthenticationResult) {
            throw new Error('Authentication failed: no AuthenticationResult in response');
        }

        // Extraer información del usuario
        const idToken = authResult.AuthenticationResult.IdToken;
        const accessToken = authResult.AuthenticationResult.AccessToken;
        const refreshToken = authResult.AuthenticationResult.RefreshToken;

        // Obtener información adicional del usuario desde DynamoDB
        const userInfo = await getUser(idToken,stage);

        // Construir la respuesta con la información del usuario
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Login successful',
                idToken,
                accessToken,
                refreshToken,
                userInfo: userInfo || {} // Incluir información del usuario si está disponible
            })
        };
        console.log("Retorna toda la informacion:",response);
        return response;
    } catch (error) {
        console.error('Error en la autenticación:', error);

        // Manejar errores de forma más específica
        let errorMessage = 'Error logging in';
        let errorCode = 400;

        switch (error.code) {
            case 'UserNotFoundException':
                errorMessage = 'Usuario no encontrado';
                break;
            case 'NotAuthorizedException':
                errorMessage = 'Credenciales incorrectas';
                break;
            case 'PasswordResetRequiredException':
                errorMessage = 'Se requiere restablecer la contraseña';
                break;
            default:
                errorMessage = error.message;
        }

        return {
            statusCode: errorCode,
            body: JSON.stringify({
                message: errorMessage,
                error: error.code // Incluir código de error para la depuración
            })
        };
    }
};

export const logOut = async(xMytoken,refreshToken) => { // xMytoken podría ser el identificador de usuario o el token de acceso
    try {
    
      const authParams = {
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: COGNITO_USER_POOL_CLIENT_ID,
        AuthParameters: {
          'USERNAME': xMytoken, // Puedes usar el identificador de usuario si lo tienes
          'REFRESH_TOKEN': refreshToken
        }
      };
      console.log("Parametros de autenticacion:",authParams);
      await cognitoClient.send(new InitiateAuthCommand(authParams));
  
      console.log("Usuario desconectado con éxito");
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Sesión cerrada con éxito" }),
      };
    } catch (error) {
      console.error("Error durante el cierre de sesión:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error al cerrar sesión" }),
      };
    }
  }
  
  

  






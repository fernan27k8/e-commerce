import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminSetUserPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({ region: "us-east-2" });
const USER_POOL_ID = 'us-east-2_9sLQ1sgn8';

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
        await cognitoClient.send(new AdminCreateUserCommand(createUserParams));

        // Establecer la contraseña permanente para el usuario
        await cognitoClient.send(new AdminSetUserPasswordCommand(setPasswordParams));

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: 'User created successfully'
            })
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
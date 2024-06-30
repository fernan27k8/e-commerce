import AWS from 'aws-sdk';
const cognito = new AWS.CognitoIdentityServiceProvider();
const USER_POOL_ID = 'us-east-2_9sLQ1sgn8';

export const createUser = async (body) => {
    const data = JSON.parse(body);

    const params = {
        UserPoolId: USER_POOL_ID,
        Username: data.email, // Usar el correo electrónico como nombre de usuario
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

    try {
        await cognito.adminCreateUser(params).promise();

        // Establecer la contraseña permanente para el usuario
        const setPasswordParams = {
            Password: data.password,
            UserPoolId: USER_POOL_ID,
            Username: data.email
        };
        await cognito.adminSetUserPassword(setPasswordParams).promise();

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

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand, DynamoDBDocumentClient,ScanCommand } from "@aws-sdk/lib-dynamodb";
import jwk from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';



const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const getUser = async (idusuario, stage) => {
  const command = {
    TableName: stage + "_e-commerce_table",
    Key: {
      pk: "USER",
      sk: idusuario,
    },
  };

  try {
    const response = await docClient.send(new GetCommand(command));
    if ("Item" in response) {
      return { statusCode: 200, body: JSON.stringify(response.Item) };
    } else {
      return { statusCode: 404, body: JSON.stringify({ message: "Usuario no encontrado" }) };
    }
  } catch (error) {
    console.error("Error getting user:", error);
    return { statusCode: 500, body: JSON.stringify({ message: "Error al obtener usuario" }) };
  }
};

export const addUser = async (bodyI,bodyA,stage) => {
  const dataI = JSON.parse(bodyI);
  const dataA = JSON.parse(bodyA);
  const command = {
    TableName: stage + "_e-commerce_table",
    Item: {
      PK: "USER",
      SK: dataA.userId,
      address: dataI.address,
      email: dataI.email,
      GSIpk: uuidv4()
    },
  };

  try {
    await docClient.send(new PutCommand(command));
    return { statusCode: 200, body: JSON.stringify({ message: "Usuario creado exitosamente" }) };
  } catch (error) {
    console.error("Error adding user:", error);
    return { statusCode: 500, body: JSON.stringify({ message: "Error al crear usuario" }) };
  }
};

export const getUserInfo = async (idToken,stage)=> {
  try {
      // Decodificar el token para obtener información del usuario
      const decodedToken = jwk.decode(idToken); // Implementar esta función según tus necesidades

      // Usar el Username (u otro identificador único) para buscar información en DynamoDB
      const userId = decodedToken.username; // Suponiendo que el username es el identificador en DynamoDB
      const params = new ScanCommand({
          TableName: stage + "_e-commerce_table",
          Key: {
              userId: userId
          }
      });
      const data = await docClient.send(params);
      return data.Item.idCarrito; // Devuelve los datos del usuario encontrados en DynamoDB
  } catch (error) {
      console.error('Error al obtener información del usuario desde DynamoDB:', error);
      return null; // Manejar el error apropiadamente según tus necesidades
  }
}
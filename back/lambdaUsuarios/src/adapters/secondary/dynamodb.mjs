import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

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

export const addUser = async (usuario, stage) => {
  const command = {
    TableName: stage + "_e-commerce_table",
    Item: {
      pk: "USER",
      sk: usuario.userId,
      address: usuario.address,
      email: usuario.email,
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
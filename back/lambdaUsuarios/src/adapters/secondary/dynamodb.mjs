import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const getUser = async (usuario, stage) => {
  const params = {
    TableName: stage + "_e-commerce_table",
    Key: {
      pk: "USER",
      sk: usuario.userId,
    },
  };

  try {
    const response = await docClient.send(new GetCommand(params));
    if ("Item" in response) {
      return { statusCode: 200, body: JSON.stringify(response.Item) };
    } else {
      return { statusCode: 404, body: JSON.stringify({ message: "Usuario no encontrado" }) };
    }
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: "Error al obtener usuario" }) };
  }
};

export const addUser = async (usuario, stage) => {
  const params = {
    TableName: stage + "_e-commerce_table",
    Item: {
      pk: "USER", 
      sk: usuario.userId,
      address: usuario.address,
      email: usuario.email,
    },
  };
  try {
    await docClient.send(new PutCommand(params));
    return { statusCode: 200, body: JSON.stringify({ message: "Usuario creado exitosamente" }) };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: "Error al crear usuario" }) };
  }
};

export const putUser = async (usuario, stage) => {
  const params = {
    TableName: stage + "_e-commerce_table",
    Key: {
      pk: "USER",
      sk: usuario.userId, 
    },
    UpdateExpression: "SET #address = :address", 
    ExpressionAttributeNames: {
      "#address": "address",
    },
    ExpressionAttributeValues: {
      ":address": usuario.address,
    },
  };

  try {
    await docClient.send(new PutCommand(params));
    return { statusCode: 200, body: JSON.stringify({ message: "Dirección de usuario actualizada exitosamente" }) };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: "Error al actualizar la dirección del usuario" }) };
  }
};
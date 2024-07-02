import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand, DynamoDBDocumentClient,ScanCommand } from "@aws-sdk/lib-dynamodb";
import jwk from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';



const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const getUser = async (idToken, stage) => {
  const decodedToken = jwk.decode(idToken);
  console.log("Info Token",decodedToken);
  const idUsuario = decodedToken.sub;
  console.log("idUsuario:",idUsuario);

  const command = {
    TableName: stage + "_e-commerce_table",
    Key: {
      PK: "USER",
      SK: idUsuario,
    },
  };

  try {
    const response = await docClient.send(new GetCommand(command));
    console.log("Informacion User",response);
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
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand, GetCommand, DeleteCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb";
import { createRequire } from 'module'

const require = createRequire(import.meta.url);
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

      export const getCart = async (idCarrito, body, stage) => {
        const data = JSON.parse(body);
        const idUsuario = data.idUsuario;
      
        const pk = `USER#${idUsuario}`;
        const skPrefix = `CAR#${idCarrito}#PRODUCT`;
      
        const command = new ScanCommand({
          TableName: stage + "_e-commerce_table",
          FilterExpression: "PK = :pk AND begins_with(SK, :skPrefix)",
          ExpressionAttributeValues: {
            ":pk": pk,
            ":skPrefix": skPrefix,
          },
          ConsistentRead: true,
        });
      
        const response = await docClient.send(command);
        console.log("Carrito response:", response);
      
        return response.Items; 
      };

export const addCart = async (idCarrito,body, stage) => {
  const data = JSON.parse(body);
  const idUsuario = data.idUsuario;
  const idProducto = data.idProducto;
  const amount = data.amount;

  const pk = `USER#${idUsuario}`;
  const sk = `CAR#${idCarrito}#PRODUCT#${idProducto}`;

  const url = `https://yfcyqimbv1.execute-api.us-east-2.amazonaws.com/${stage}/producto/${idProducto}`;
  const response = await fetch(url);
  const productInfo = await response.json();

  if (!response.ok) {
    throw new Error(`Error al recuperar la información del producto: ${response.status}`);
  }
  for (const product of productInfo) {
    console.log(product);
    const precioUnidad = product.price;
    const stock = product.amount;
  
    console.log(`Precio: $${precioUnidad}`);
    console.log(`Stock: ${stock}`);

  try {
    if (stock >= amount) {

      const command = new PutCommand({
        TableName: stage + "_e-commerce_table",
        Item: {
          PK: pk,
          SK: sk,
          idProducto: idProducto,
          amount: amount,
          price: precioUnidad * amount,
        },
        ConditionExpression: "attribute_not_exists(PK) AND attribute_not_exists(SK)",
      });

      await docClient.send(command);
      console.log("Producto agregado al carrito");

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Producto agregado exitosamente" }),
      };
    } else {
      console.error("Error agregando producto al carrito: Stock insuficiente");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Stock insuficiente para el producto" }),
      };
    }
  } catch (error) {
    console.error("Error agregando producto al carrito:", error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: "Error procesando la solicitud" }),
    };
  }
  }
};
export const updateCart = async (idCarrito,body, stage) => {
  const data = JSON.parse(body);
  const idUsuario = data.idUsuario;
  const idProducto = data.idProducto;
  const newAmount = data.amount; 

  const pk = `USER#${idUsuario}`;
  const sk = `CAR#${idCarrito}#PRODUCT#${idProducto}`;

  const getCommand = new GetCommand({
    TableName: stage + "_e-commerce_table",
    Key: {
      PK: pk,
      SK: sk,
    },
  });
  const url = `https://yfcyqimbv1.execute-api.us-east-2.amazonaws.com/${stage}/producto/${idProducto}`;
  const responseurl = await fetch(url);
  const productInfo = await responseurl.json();
  if (!responseurl.ok) {
    throw new Error(`Error al recuperar la información del producto: ${response.status}`);
  }
  for (const product of productInfo) {
    console.log(product);
    const precioUnidad = product.price;
    const stock = product.amount;

  try {
    const response = await docClient.send(getCommand);
    const cartItem = response.Item;

    if (!cartItem) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Producto no encontrado en el carrito" }),
      };
    }

    const currentAmount = cartItem.amount;

    if (newAmount <= 0) {
      const deleteCommand = new DeleteCommand({
        TableName: stage + "_e-commerce_table",
        Key: {
          PK: pk,
          SK: sk,
        },
      });
      await docClient.send(deleteCommand);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Producto eliminado del carrito" }),
      };
    }
    if (stock >= newAmount) {
    const updateCommand = new UpdateCommand({
      TableName: stage + "_e-commerce_table",
      Key: {
        PK: pk,
        SK: sk,
      },
      UpdateExpression: "SET amount = :newAmount, price = :newPrice",
      ExpressionAttributeValues: {
        ":newAmount": newAmount,
        ":newPrice": newAmount * precioUnidad,
      },
    });
    await docClient.send(updateCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Cantidad del producto actualizada" }),
    };
  }else {
    console.error("Error al actualizar producto del carrito: Stock insuficiente");
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Stock insuficiente para el producto" }),
    };
  }
  } catch (error) {
    console.error("Error actualizando cantidad en el carrito:", error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: "Error procesando la solicitud" }),
    };
  }
}
};






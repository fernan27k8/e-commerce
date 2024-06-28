import {DynamoDBClient, QueryCommand} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const getCart = async (idCarrito,body, stage) => {
    const data = JSON.parse(body);
    const idUsuario = data.idUsuario;

    //const pk =`USER#${idUsuario}`
    //const sk = `CAR#${idCarrito}`
    const command = new GetCommand({
      TableName: stage + "_e-commerce_table",
      Key: {
        
        PK: "USER#" + idUsuario, 
        SK: "CAR#" + idCarrito
      },
      ConsistentRead : true,
    });
    const response = await docClient.send(command);
    console.log("getCompra response:", response);
    if (response.Item) {
      return response.Item;
  } else {
      return "Carrito no encontrado";
  }
  };
  

  export const addCart = async (body, stage) => {
    const data = JSON.parse(body);
    const idCarrito = data.idCarrito;
    const idUsuario = data.idUsuario;
    const idProducto = data.idProducto;
    const amount = data.amount;
    const price = data.price*amount;
    const command = new PutCommand({
      TableName: stage + "_e-commerce_table",
      Item: {
        PK: "USER#" + idUsuario,
        SK: "CAR#" + idCarrito + "#PRODUCT#" + idProducto,  
        amount: amount,
        price: price,
      },
    });
  
    try {
      await docClient.send(command); 
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Producto agregado al carrito exitosamente" }), 
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({ error: error.message || "Error agregando producto al carrito" }), 
      };
    }
  };

  export const updateCart = async (idCarrito,body,stage) => {  
    const data = JSON.parse(body);
    const idUsuario = data.idUsuario;
    const idProducto = data.idProducto;
    const amount = data.amount;
    const price = data.price*amount;
    const command = new UpdateCommand({
      TableName: stage + "_e-commerce_table",
      Key: {
        PK: "USER#" + idUsuario, 
        SK: "CAR#" + idCarrito + "#PRODUCT#" + idProducto, 
      },
      UpdateExpression: "SET #amount = :amount, #price = :price", 
      ExpressionAttributeNames: {
        "#amount": "amount",
        "#price": "price"
      },
      ExpressionAttributeValues: {
        ":amount": amount,
        ":price": price || date.price * amount,
      },
    });
  
    try {
      await docClient.send(command); 
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Cantidad de producto actualizada exitosamente" }), 
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({ error: error.message || "Error actualizando la cantidad del producto" }), 
      };
    }
}
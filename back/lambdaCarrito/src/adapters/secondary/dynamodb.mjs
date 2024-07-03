import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb";
import { createRequire } from 'module'

const require = createRequire(import.meta.url);
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

      export const getCart = async (idUsuario,idCarrito, stage) => {   
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

      export const addCart = async (idUsuario, idCarrito, body, price, stage) => {
        console.log("llegue");
        const data = JSON.parse(body)
        const amount = data.amount; 
        const idProducto = data.idProducto;
        const pk = `USER#${idUsuario}`;
        const sk = `CAR#${idCarrito}#PRODUCT#${idProducto}`;
        const command = new PutCommand({
            TableName: `${stage}_e-commerce_table`,
            Item: {
                PK: pk ,
                SK: sk ,
                idProducto: idProducto ,
                amount: amount,
                price: price,
            },
            ConditionExpression: "attribute_not_exists(PK) AND attribute_not_exists(SK)"
        });

        try {
            const response = await docClient.send(command);
            console.log("Producto agregado al carrito:", response);
            return { message: "Producto añadido correctamente" };
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
            throw new Error(JSON.stringify(error) || "Error en addCart");
        }
    };

    export const updateCart = async (idUsuario, idCarrito, body, price, stage) => {
      const data = JSON.parse(body);
      const pk = `USER#${idUsuario}`;
      const sk = `CAR#${idCarrito}#PRODUCT#${data.idProducto}`;
  
      const command = new UpdateCommand({
          TableName: `${stage}_e-commerce_table`,
          Key: {
              PK: pk ,
              SK: sk 
          },
          UpdateExpression: "SET amount = :newAmount, price = :newPrice",
          ExpressionAttributeValues: {
              ":newAmount": data.amount,
              ":newPrice": price
          },
          ConditionExpression: "attribute_exists(PK) AND attribute_exists(SK)",
          ReturnValues: "UPDATED_NEW"
      });
  
      try {
          const response = await docClient.send(command);
          console.log("Cantidad del producto actualizada en el carrito:", response);
          return { message: "Producto editado correctamente" };;
      } catch (error) {
          console.error("Error al actualizar la cantidad del producto en el carrito:", error);
          throw new Error(JSON.stringify(error) || "Error en updateCartProductAmount");
      }
  };






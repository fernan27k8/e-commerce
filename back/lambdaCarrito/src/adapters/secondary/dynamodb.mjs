import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb"

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const getCart = async (carrito, stage) => {
    const params = {
      TableName: stage + "_e-commerce_table",
      Key: {
        pk: "USER#" + carrito.userId, 
        sk: "CAR#" + carrito.cartId + "#PRODUCT"
      },
    };
  
    try {
      const response = await docClient.get(params);
      const cartItems = response.Item ? response.Item.products : [];
      return {
        statusCode: 200,
        body: JSON.stringify({ cartItems }), 
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({ error: error.message || "Error fetching cart items" }),
      };
    }
  };

  export const addCart = async (carrito, producto, stage) => {
    //const { stage, userId, cartId } = event.pathParameters; // Extract parameters from path
    //const productData = JSON.parse(event.body); // Parse product data from request body
    //const { productId, quantity } = productData; // Extract product ID and quantity
  
    const params = {
      TableName: stage + "_e-commerce_table",
      Item: {
        pk: "USER#" + carrito.userId,
        sk: "CAR#" + carrito.cartId + "#PRODUCT#" + producto.productId, 
        productId: producto.productId, 
        quantity: quantity,
      },
    };
  
    try {
      await docClient.put(params); 
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

  export const updateCartProductQuantity = async (carrito,amount,stage) => {  
    const params = {
      TableName: stage + "_e-commerce_table",
      Key: {
        pk: "USER#" + carrito.userId, 
        sk: "CAR#" + carrito.cartId + "#PRODUCT#" + carrito.productId, 
      },
      UpdateExpression: "SET #amount = :amount", 
      ExpressionAttributeNames: {
        "#amount": "amount",
      },
      ExpressionAttributeValues: {
        ":amount": amount,
      },
    };
  
    try {
      await docClient.update(params); 
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
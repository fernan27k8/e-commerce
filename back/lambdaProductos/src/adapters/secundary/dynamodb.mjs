import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {QueryCommand, DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const queryProducts = async (stage) =>{
    const command = new QueryCommand({
        TableName: `${stage}_e-commerce_table`, //Nombre de la tabla
        KeyConditionExpression:
        "PK = :pk", //ajustar
        ExpressionAttributeValues: {
        ":pk": "PRODUCT", //ajustar
        },
        ConsistentRead: true,
    });

    const response = await docClient.send(command);
    console.log("queryProducts",response);
    if(response["Count"] > 0){
        return response["Items"];
    }
    return "Sin datos";
}


export const getProduct = async (idProduct, stage) =>{
    const command = new QueryCommand({
        TableName: `${stage}_e-commerce_table`, //nombre de la tabla
        KeyConditionExpression: "PK = :pk AND SK = :sk", //ajustar
        ExpressionAttributeValues:{
            ":pk": "PRODUCT", //ajustar
            ":sk": idProduct //ajustar
        },
        ConsistentRead: true,
    });

    const response = await docClient.send(command);
    console.log("QueryProducts", response);
    if(response["Count"] > 0 ){
        return response.Items[0];
    }
    return "Sin datos";
}

export const updateProducts = async (stage, body) => {
    try {
        const productList = JSON.parse(body); // Parsea el JSON para obtener la lista de productos
        const updates = [];

        // Itera sobre cada producto en la lista
        for (const product of productList) {
            const idProduct = product.id_product; // Suponiendo que 'SK' es el identificador único del producto
            const amount = Number(product.amount);

            // Verifica que amount sea un número válido y mayor o igual a cero
            if (isNaN(amount) || amount < 0) {
                throw new Error(`Invalid amount value for product with ID ${idProduct}`);
            }

            // Obtiene el producto existente
            const queryCommand = new QueryCommand({
                TableName: `${stage}_e-commerce_table`,
                KeyConditionExpression: "PK = :pk AND SK = :sk",
                ExpressionAttributeValues: {
                    ":pk": "PRODUCT",
                    ":sk": idProduct
                },
                ConsistentRead: true,
            });

            const queryResponse = await docClient.send(queryCommand);

            if (queryResponse.Count > 0) {
                const currentProduct = queryResponse.Items[0];
                const currentAmount = currentProduct.amount || 0;

                // Verifica que amount no sea mayor que currentAmount
                if (amount > currentAmount) {
                    throw new Error(`Amount to reduce exceeds current amount for product with ID ${idProduct}`);
                }

                // Calcula el nuevo amount
                const newAmount = currentAmount - amount;

                // Prepara la operación de actualización
                const updateCommand = new UpdateCommand({
                    TableName: `${stage}_e-commerce_table`,
                    Key: {
                        PK: "PRODUCT",
                        SK: idProduct
                    },
                    UpdateExpression: "set amount = :newAmount",
                    ExpressionAttributeValues: {
                        ":newAmount": newAmount
                    },
                    ReturnValues: "UPDATED_NEW"
                });

                const updateResponse = await docClient.send(updateCommand);

                // Agrega el objeto con id_producto y amount actualizado a la lista de respuestas
                updates.push({
                    id_producto: idProduct,
                    amount: updateResponse.Attributes.amount // o el nombre del atributo que devuelve el nuevo amount
                });
            } else {
                throw new Error(`Product not found with ID ${idProduct}`);
            }
        }

        return updates; // Retorna la lista de objetos con id_producto y amount actualizado
    } catch (error) {
        console.error('Error updating products:', error);
        throw error;
    }
}

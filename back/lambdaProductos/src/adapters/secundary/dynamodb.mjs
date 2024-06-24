import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const queryProducts = async (stage) =>{
    const command = new QueryCommand({
        TableName: stage + "", //Nombre de la tabla
        KeyConditionExpression:
        "pk = :pk", //ajustar
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
        TableName: stage + "", //nombre de la tabla
        KeyConditionExpression: "pk = :pk AND sk = :sk", //ajustar
        ExpressionAttributeValues:{
            ":pk": "PRODUCT", //ajustar
            ":sk": idProduct //ajustar
        },
        ConsistentRead: true,
    });

    const response = await docClient.send(command);
    console.log("QueryProducts", response);
    if(response["Count"] > 0 ){
        return response["Items"];
    }
    return "Sin datos";
}
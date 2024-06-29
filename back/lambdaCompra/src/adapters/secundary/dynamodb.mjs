import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {QueryCommand, DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const listCompras = async (stage, body) => {
    try {
        // Parsear el JSON del cuerpo de la solicitud
        const data = JSON.parse(body);
        const id_usuario = data.id_usuario;

        // Construir las claves de consulta
        const pk = `USER#${id_usuario}`;
        const skPrefix = `BUY#`;

        const command = new QueryCommand({
            TableName: stage + `_e-commerce_table`, // Asegúrate de tener el nombre correcto de tu tabla con el sufijo de stage
            KeyConditionExpression: "PK = :pk AND begins_with(SK, :skPrefix)",
            ExpressionAttributeValues: {
                ":pk": pk,
                ":skPrefix": skPrefix,
            },
            ConsistentRead: true,
        });

        const response = await docClient.send(command);
        console.log("listCompras response:", response);

        if (response.Items && response.Items.length > 0) {
            return response.Items;
        } else {
            return "Sin datos";
        }
    } catch (error) {
        console.error("Error en listCompras:", error);
        throw new Error("Error al listar compras");
    }
}


export const getCompra = async (stage, id_compra, body) => {
    try {
        // Parsear el JSON del cuerpo de la solicitud
        const data = JSON.parse(body);
        const id_usuario = data.id_usuario;
        const id_carrito = data.id_carrito;

        // Construir las claves de consulta según tu estructura
        const pk = `USER#${id_usuario}`;
        const sk = `CAR#${id_carrito}#BUY`;

        const command = new GetCommand({
            TableName: `${stage}_e-commerce_table`, // Asegúrate de tener el nombre correcto de tu tabla con el sufijo de stage
            Key: {
                PK: pk,
                SK: sk,
            },
        });

        const response = await docClient.send(command);
        console.log("getCompra response:", response);

        if (response.Item) {
            return response.Item;
        } else {
            return "Compra no encontrada";
        }
    } catch (error) {
        console.error("Error en getCompra:", error);
        throw new Error("Error al obtener compra");
    }
}

export const addCompra = async (stage, body) => {
    try {
        // Parsear el JSON del cuerpo de la solicitud
        const data = JSON.parse(body);
        const id_usuario = data.user_id;
        const id_carrito = data.car_id;
        const id_compra = data.buy_id;

        // Construir la clave de partición (pk) y de ordenación (sk)
        const pk = `USER#${id_usuario}`;
        const sk = `CAR#${id_carrito}#BUY`;

        // Construir el objeto de compra que se va a insertar
        const compra = {
            PK: pk,
            SK: sk,
            date: new Date().toISOString(),
            GSIpk: id_compra,
            price: data.price,
            status: "pagado"
        };

        const command = new PutCommand({
            TableName: `${stage}_e-commerce_table`,
            Item: compra,
        });

        await docClient.send(command);

        return { message: "Compra añadida correctamente" };
    } catch (error) {
        console.error("Error en addCompra:", error);
        throw new Error("Error al añadir compra");
    }
};
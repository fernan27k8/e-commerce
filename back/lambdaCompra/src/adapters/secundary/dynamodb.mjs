import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {QueryCommand, DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const listCompras = async (stage, id_usuario) => {
    try {
        // Construir las claves de consulta
        const pk = `USER#${id_usuario}`;
        const skSuffix = `BUY`;

        const command = new QueryCommand({
            TableName: `${stage}_e-commerce_table`, // Asegúrate de tener el nombre correcto de tu tabla con el sufijo de stage
            KeyConditionExpression: "PK = :pk",
            ExpressionAttributeValues: {
                ":pk": pk
            },
            ConsistentRead: true,
        });

        const response = await docClient.send(command);
        console.log("listCompras response:", response);

        if (response.Items && response.Items.length > 0) {
            // Filtrar elementos cuyo SK termine con el valor deseado
            const filteredItems = response.Items.filter(item => 
                item.SK.endsWith(skSuffix)
            );

            return filteredItems.length > 0 ? filteredItems : "Sin datos";
        } else {
            return "Sin datos";
        }
    } catch (error) {
        console.error("Error en listCompras:", error);
        throw new Error("Error al listar compras");
    }
};


export const getCompra = async (stage, id_usuario, id_carrito) => {
    try {
        // Construir las claves de consulta según tu estructura
        const pk = `USER#${id_usuario}`;
        const skPrefix = `CAR#${id_carrito}`;

        const command = new QueryCommand({
            TableName: `${stage}_e-commerce_table`, // Asegúrate de tener el nombre correcto de tu tabla con el sufijo de stage
            KeyConditionExpression: "PK = :pk AND begins_with(SK, :skPrefix)",
            ExpressionAttributeValues: {
                ":pk": pk,
                ":skPrefix": skPrefix,
            },
        });

        const response = await docClient.send(command);
        console.log("getCompra response:", response);

        if (response.Items && response.Items.length > 0) {
            return response.Items;
        } else {
            return "Compra no encontrada";
        }
    } catch (error) {
        console.error("Error en getCompra:", error);
        throw new Error("Error al obtener compra");
    }
}

export const addCompra = async (stage, id_usuario, id_carrito, body) => {
    try {
        // Parsear el JSON del cuerpo de la solicitud
        const data = JSON.parse(body);
        const id_compra = uuidv4();

        // Construir la clave de partición (pk) y de ordenación (sk)
        const pk = `USER#${id_usuario}`;
        const sk = `BUY#CAR#${id_carrito}`;

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


export const createCar = async (stage, id_usuario) => {
    const newCarrito = uuidv4();

    // Construir la clave de partición (pk) y de ordenación (sk)
    const pk = `USER`;
    const sk = id_usuario;

    // Consultar el usuario en la tabla
    const queryCommand = new QueryCommand({
        TableName: `${stage}_e-commerce_table`,
        KeyConditionExpression: "PK = :pk AND SK = :sk",
        ExpressionAttributeValues: {
            ":pk": pk,
            ":sk": sk,
        },
    });

    try {
        const { Items } = await client.send(queryCommand);

        if (Items.length > 0) {
            // El usuario existe, actualizar el GSIpk con el newCarrito
            const updateCommand = new UpdateCommand({
                TableName: `${stage}_e-commerce_table`,
                Key: {
                    PK: pk ,
                    SK: sk ,
                },
                UpdateExpression: "SET GSIpk = :newCarrito",
                ExpressionAttributeValues: {
                    ":newCarrito": newCarrito ,
                },
            });

            await client.send(updateCommand);
            return newCarrito;
        } else {
            console.log("Usuario no encontrado");
        }
    } catch (error) {
        console.error("Error al actualizar el carrito del usuario:", error);
    }
};
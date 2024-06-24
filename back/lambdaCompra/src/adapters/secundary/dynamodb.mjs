import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const listCompras = async (stage, body) => {
    try {
        // Parsear el JSON del cuerpo de la solicitud
        const data = JSON.parse(body);
        const id_usuario = data.id_usuario;
        const id_carrito = data.id_carrito;

        // Construir la clave de consulta
        const pk = `usuario#${id_usuario}#carrito#${id_carrito}`;

        const command = new QueryCommand({
            TableName: stage + "dev_e-commerce_table", // Asegúrate de tener el nombre correcto de tu tabla con el sufijo de stage
            KeyConditionExpression: "pk = :pk",
            ExpressionAttributeValues: {
                ":pk": pk,
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
        const pk = `usuario#${id_usuario}#carrito#${id_carrito}`;
        const sk = `compra#${id_compra}`;

        const command = new GetCommand({
            TableName: stage + "dev_e-commerce_table", // Asegúrate de tener el nombre correcto de tu tabla con el sufijo de stage
            Key: {
                pk: { S: pk },
                sk: { S: sk },
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
};

export const addCompra = async (stage, body) => {
    try {
        // Parsear el JSON del cuerpo de la solicitud
        const data = JSON.parse(body);
        const id_usuario = data.id_usuario;
        const id_carrito = data.id_carrito;
        const id_compra = data.id_compra;

        // Construir la clave de partición (pk) y de ordenación (sk)
        const pk = `usuario#${id_usuario}#carrito#${id_carrito}`;
        const sk = `compra#${id_compra}`;

        // Construir el objeto de compra que se va a insertar
        const compra = {
            pk: { S: pk },
            sk: { S: sk },
            // Otros atributos de compra que puedas tener en el body
            // Ejemplo:
            // producto: { S: data.producto },
            // cantidad: { N: data.cantidad.toString() },
            // precio: { N: data.precio.toString() },
            // fechaCompra: { S: new Date().toISOString() }
        };

        const command = new PutCommand({
            TableName: stage + "dev_e-commerce_table", // Asegúrate de tener el nombre correcto de tu tabla con el sufijo de stage
            Item: compra,
        });

        await docClient.send(command);

        return { message: "Compra añadida correctamente" };
    } catch (error) {
        console.error("Error en addCompra:", error);
        throw new Error("Error al añadir compra");
    }
};
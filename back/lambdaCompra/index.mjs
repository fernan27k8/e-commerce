import { apigtwAdapter } from "./src/adapters/primary/apigtw_event.mjs";

const getStage = (context) => {
    const invokedFunctionArn = context.invokedFunctionArn || "";
    const stage = invokedFunctionArn.split(":")[7] || "unknown";
    console.log("handler::stage", stage);
    return stage;
};

// Define el handler
export const handler = async (event, context) => {
    let responseEvent = {};
    console.log("handler::event", event);
    console.log("handler::context", context);
    const stage = getStage(context);

    try {
        
        if (event["httpMethod"]) {
            responseEvent = await apigtwAdapter(event, stage);
        } else{
            responseEvent = { message: "Evento no reconocido" };
        }

        //Devolver la respuesta
        return {
            statusCode: 200,
            body: JSON.stringify(responseEvent),
        };

    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error in server" }),
        };
    }
};

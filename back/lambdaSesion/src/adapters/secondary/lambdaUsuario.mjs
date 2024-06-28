import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
const client = new LambdaClient({region: "us-east-2"});
export const otherLambda = async (body,stage) => {
    const command = new InvokeCommand ({
        FunctionName: `CRUDUsuario:${stage}`,
        Payload: JSON.stringify(body),
    });
    try{
        const response = await client.send(command);
        console.log("InvokeLambda",response);
        const {Payload, LogResult} = response;
        const result = Payload? Buffer.from(Payload).toString():null;
        const logs = LogResult? Buffer.from(LogResult,"base64").toString():null;
        if (result) {
            console.log("Result:", result);
        }
        if (logs) {
            console.log("Logs:", logs);
        }
        return JSON.parse(result);
    }catch(error){
        console.error("Error invoking Lambda:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error invoking Lambda", error: error.message }),
        };
    }
};
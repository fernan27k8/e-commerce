import { apigtwAdapter } from "./src/adapters/primary/apigtwEvent.mjs";

export const handler = async (event, context) => {
    let responseEvent = {};
  
    const stage = await getStage(context);
  
    console.log("validateEvent::event",event);
    if(event["httpMethod"]){
      responseEvent = await apigtwAdapter(event, stage);
    }
  
    const response ={
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
    },
      body: JSON.stringify(responseEvent),
    };
    return response;
  }
  
  export const getStage = async(context) =>{
    const invokedFunctionArn = context["invokedFunctionArn"];
    const stage = invokedFunctionArn.split(":")[7];
    console.log("handler::stage",stage);
    return stage;
  }
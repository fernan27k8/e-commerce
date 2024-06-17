export const handler = async (event, context) => {
    let responseEvent = {};
  
    const stage = await getStage(context);
  
    console.log("validateEvent::event",event);
    if(event["httpMethod"]){
      responseEvent = await apigtwAdapter(event, stage);
    }else if(event["isManualEvent"]){
      responseEvent = await manualAdapter(event, stage);
    }else if(event["Records"]){
      const records = event["Records"];
      if(records[0]["EventSource"]=="aws:sns"){
        responseEvent = await snsAsapter(records,stage)
      }else{
        responseEvent = "Evento no reconocido";
      }
    }else{
      responseEvent = "Evento no reconocido";
    }
  
    const response ={
      statusCode: 200,
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
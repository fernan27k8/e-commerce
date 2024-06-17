export const apigtwAdapter = async (apigtwEvent, stage) =>{

    const headers = apigtwEvent["headers"];

    console.log("handleApigtwEvent::headers",headers);

    let response = {};

    const xMytoken = headers["x-mytoken"];
    console.log("handleApigtwEvent::x-mytoken", xMytoken);

    const httpMethod = apigtwEvent["httpMethod"];
    const resource = apigtwEvent["resource"];

    switch(httpMethod){
        case "GET":
            if (resource == '/carrito/{id_carrito}'){
                const pathParams = apigtwEvent["pathParameters"];
                console.log("handleApigtwEvent::pathParams",pathParams);
                const id_carrito = pathParams["id_carrito"];
                console. log("handleApigtwEvent::idCarrito",id_usuario);
                if (id_carrito!= ""|| id_carrito != undefined){
                    response = await getProductUC(id_carrito,stage,xMytoken);
                }
            }
            break;
        
        case "POST":
            if(resource == '/carrito'){
                const body = apigtwEvent["body"]
                console.log("handleApigtwEvent::body",body);
                response = await addCarritoUC(body,stage,xMytoken);
            }
            break;
            
        case "PUT":
            if(resource == '/carrito/{id_carrito}'){
                const pathParams = apigtwEvent.pathParameters;
                console.log("handleApigtwEvent::pathParams", pathParams);
                const id_carrito = pathParams["id_carrito"];
                console.log("handleApigtwEvent::id_carrito", id_carrito);

                if (id_carrito) {
                    const body = apigtwEvent["body"];
                    console.log("handleApigtwEvent::body", body);
                    response = await updateCarritoUC(id_carrito, body, stage, xMytoken);
                }
            }
            break;
        
        case "DELETE":
            if (resource === '/carrito/{id_carrito}') {
                const pathParams = apigtwEvent.pathParameters;
                console.log("handleApigtwEvent::pathParams", pathParams);
                const id_carrito = pathParams["id_usuario"];
                console.log("handleApigtwEvent::id_carrito", id_carrito);

                if (id_carrito) {
                    response = await deleteCarritoUC(id_carrito, stage, xMytoken);
                }
            }
            break; 
    }
    return response;
}
export const apigtwAdapter = async (apigtwEvent, stage)  => {
    let response = {};

    // Obtener los encabezados del evento
    const headers = apigtwEvent["headers"];
    console.log("handler::headers", headers)

    //imprimir token
    //const xMytoken = headers["x-mytoken"];
    //console.log("handleApigtwEvent::x-mytoken", xMytoken);

    const httpMethod = apigtwEvent["httpMethod"];
    const resource = apigtwEvent["resource"];

    switch(httpMethod){
        case "GET":
            if(resource == '/producto'){
                response = await listProductsUC(stage, xMytoken);
            }else if(resource == '/producto/{id_producto}'){
                const pathParams = apigtwEvent["pathParameters"];
                console.log("handleApigtwEvent::pathParams", pathParams);
                const idProduct = pathParams["id_producto"];
                console.log("handleApigtwEvent::idProduct", idProduct);
                if(idProduct != "" || idProduct != undefined){
                    response = await getProductUC(idProduct, stage, xMytoken);
                }
            }
            break;
    }
    return response;
}
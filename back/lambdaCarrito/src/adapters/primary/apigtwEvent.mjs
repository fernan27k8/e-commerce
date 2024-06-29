import { getCarritoUC } from "../../domain/use_cases/uc_getCarrito.mjs";
import { addCarritoUC } from "../../domain/use_cases/uc_addCarrito.mjs";
import { updateCarritoUC } from "../../domain/use_cases/uc_updateCarrito.mjs";

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
                const body = apigtwEvent["body"]
                console.log("handleApigtwEvent::body",body);
                const idCarrito = pathParams["id_carrito"];
                console. log("handleApigtwEvent::idCarrito",idCarrito);
                if (idCarrito!= ""|| idCarrito != undefined){
                    response = await getCarritoUC(idCarrito,body,stage,xMytoken);
                }
            }
            break;
        
        case "POST":
            if(resource == '/carrito/{id_carrito}'){
                const pathParams = apigtwEvent.pathParameters;
                console.log("handleApigtwEvent::pathParams", pathParams);
                const idCarrito = pathParams["id_carrito"];
                console.log("handleApigtwEvent::idCarrito", idCarrito);
                if (idCarrito) {
                    const body = apigtwEvent["body"];
                    console.log("handleApigtwEvent::body", body);
                    response = await addCarritoUC(idCarrito,body,stage,xMytoken);
                }
            }
            break;
            
        case "PUT":
            if(resource == '/carrito/{id_carrito}'){
                const pathParams = apigtwEvent.pathParameters;
                console.log("handleApigtwEvent::pathParams", pathParams);
                const idCarrito = pathParams["id_carrito"];
                console.log("handleApigtwEvent::idCarrito", idCarrito);

                if (idCarrito) {
                    const body = apigtwEvent["body"];
                    console.log("handleApigtwEvent::body", body);
                    response = await updateCarritoUC(idCarrito, body, stage, xMytoken);
                }
            }
            break;
    }
    return response;
}
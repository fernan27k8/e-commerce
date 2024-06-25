import { getUsuarioUC } from "../../domain/use_cases/uc_getUsuario.mjs";
import { addUsuarioUC } from "../../domain/use_cases/uc_addUsuario.mjs";
import { updateUsuarioUC } from "../../domain/use_cases/uc_updateUsuario.mjs";

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
            if (resource == '/usuario/{id_usuario}'){
                const pathParams = apigtwEvent["pathParameters"];
                console.log("handleApigtwEvent::pathParams",pathParams);
                const id_usuario = pathParams["id_usuario"];
                console. log("handleApigtwEvent::idCarrito",id_usuario);
                if (id_usuario!= ""|| id_usuario != undefined){
                    response = await getUsuarioUC(id_usuario,stage,xMytoken);
                }
            }
            break;
        
        case "POST":
            if(resource == '/usuario'){
                const body = apigtwEvent["body"]
                console.log("handleApigtwEvent::body",body);
                response = await addUsuarioUC(body,stage,xMytoken);
            }
            break;
            
        case "PUT":
            if(resource == '/usuario/{id_usuario}'){
                const pathParams = apigtwEvent.pathParameters;
                console.log("handleApigtwEvent::pathParams", pathParams);
                const id_usuario = pathParams["id_usuario"];
                console.log("handleApigtwEvent::id_usuario", id_usuario);

                if (id_usuario) {
                    const body = apigtwEvent["body"];
                    console.log("handleApigtwEvent::body", body);
                    response = await updateUsuarioUC(id_usuario, body, stage, xMytoken);
                }
            }
            break;
    }
    return response;
}
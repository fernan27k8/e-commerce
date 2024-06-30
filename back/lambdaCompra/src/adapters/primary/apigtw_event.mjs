import { addCompraUC } from "../../domain/use_cases/uc_add_compra.mjs";
import { getCompraUC } from "../../domain/use_cases/uc_get_compra.mjs";
import { listComprasUC } from "../../domain/use_cases/uc_list_compra.mjs";

export const apigtwAdapter = async (apigtwEvent, stage)  => {
    let response = {};

    // Obtener los encabezados del evento
    const headers = apigtwEvent["headers"];
    console.log("handler::headers", headers)

    const httpMethod = apigtwEvent["httpMethod"];
    const resource = apigtwEvent["resource"];

    switch(httpMethod){
        case "GET":
            //Conocer el estatus de la compra
            if(resource == '/compra/{id_compra}'){
                console.log("Detalles de venta");
                const pathParams = apigtwEvent["pathParameters"];
                console.log("handleApigtwEvent::pathParams", pathParams);
                const idCompra = pathParams["id_compra"];
                console.log("handleApigtwEvent::idCompra", idCompra);
                const body = apigtwEvent["body"]
                console.log("handlerApigtwEvent::Body", body);
                if(idCompra != "" || idCompra != undefined){
                    response = await getCompraUC(stage, idCompra, body);
                }
            }
            //ver historial de compras de un usuario
            else if(resource == '/compra'){
                console.log("Historial de compras");
                const body = apigtwEvent["body"]
                console.log("handlerApigtwEvent::Body", body);
                response = await listComprasUC(stage, body)
            }
            break;
        case "POST":
            //confirmar una compra
            if(resource == '/compra'){
                console.log("Confirmar compra");
                const body = apigtwEvent["body"]
                console.log("handlerApigtwEvent::Body", body);
                response = await addCompraUC(stage, body);
                    
            }
    }
    return response;
}
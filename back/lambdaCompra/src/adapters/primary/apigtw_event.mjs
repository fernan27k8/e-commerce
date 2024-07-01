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
            if(resource == '/compra/{id_usuario}/{id_carrito}'){
                console.log("Detalles de venta");
                const pathParams = apigtwEvent["pathParameters"];
                console.log("handleApigtwEvent::pathParams", pathParams);
                const idUsuario = pathParams["id_usuario"];
                console.log("handleApigtwEvent::idUsuario", idUsuario);
                const idCarrito = pathParams["id_carrito"];
                console.log("handleApigtwEvent::idCarrito", idCarrito);
                if (idCarrito && idCarrito !== "") {
                    response = await getCompraUC(stage, idUsuario, idCarrito);
                }
            }
            //ver historial de compras de un usuario
            else if(resource == '/compra/{id_usuario}'){
                console.log("Historial de compras");
                const pathParams = apigtwEvent["pathParameters"];
                console.log("handleApigtwEvent::pathParams", pathParams);
                const idUsuario = pathParams["id_usuario"];
                console.log("handleApigtwEvent::idUsuario", idUsuario);
                response = await listComprasUC(stage, idUsuario)
            }
            break;
        case "POST":
            //confirmar una compra
            if(resource == '/compra/{id_usuario}/{id_carrito}'){
                console.log("Confirmar compra");
                const pathParams = apigtwEvent["pathParameters"];
                console.log("handleApigtwEvent::pathParams", pathParams);
                const idUsuario = pathParams["id_usuario"];
                console.log("handleApigtwEvent::idUsuario", idUsuario);
                const idCarrito = pathParams["id_carrito"];
                console.log("handleApigtwEvent::idCarrito", idCarrito);
                const body = apigtwEvent["body"]
                console.log("handlerApigtwEvent::Body", body);
                response = await addCompraUC(stage, idUsuario, idCarrito, body);
                    
            }
    }
    return response;
}
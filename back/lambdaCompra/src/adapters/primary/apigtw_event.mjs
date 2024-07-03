import { addCompraUC } from "../../domain/use_cases/uc_add_compra.mjs";
import { getCompraUC } from "../../domain/use_cases/uc_get_compra.mjs";
import { listComprasUC } from "../../domain/use_cases/uc_list_compra.mjs";
import {CognitoJwtVerifier} from "aws-jwt-verify";

export const apigtwAdapter = async (apigtwEvent, stage)  => {
    let response = {};

    // Obtener los encabezados del evento
    const headers = apigtwEvent["headers"];
    console.log("handler::headers", headers)

    const xMytoken = headers["xmytoken"];
    console.log("handleApigtwEvent::xmytoken", xMytoken);
    const verifiedToken = await verifyToken(xMytoken);
    if (verifiedToken === "Token not valid") {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: "Unauthorized" }),
        };
    }
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
                response = await addCompraUC(stage, idUsuario, idCarrito, body, xMytoken);
                    
            }
    }
    return response;
}

export const verifyToken = async(token) => {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: "us-east-2_vUuuGCj2W",
      tokenUse: "id",
      clientId: "6e4puvndqb2kirmv9fpnu0ujq",
    });
  
    try {
      const response = await verifier.verify(token);
      console.log("Token is valid. Response", response);
      return response;
    } catch (error) {
      console.error("Token not valid:", error);
      return "Token not valid";
    }
  }
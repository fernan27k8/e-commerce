import { getProductUC } from "../../domain/use_cases/uc_get_product.mjs";
import { listProductsUC } from "../../domain/use_cases/uc_list_products.mjs";
import { updateProductsUC } from "../../domain/use_cases/uc_put_product.mjs";

export const apigtwAdapter = async (apigtwEvent, stage)  => {
    let response = {};

    // Obtener los encabezados del evento
    const headers = apigtwEvent["headers"];
    console.log("handler::headers", headers);
    const xMytoken = headers["x-mytoken"];
    console.log("handleApigtwEvent::x-mytoken", xMytoken);
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
            //obtener lista de productos
            if(resource == '/producto'){
                response = await listProductsUC(stage)
            }
            //Obtener productos por categoria
            else if(resource == '/producto/{id_category}'){
                console.log("Falta implementar :(");
            }
            //obtener un producto en particular
            else if(resource == '/producto/{id_producto}'){
                const pathParams = apigtwEvent["pathParameters"];
                console.log("handleApigtwEvent::pathParams", pathParams);
                const idProduct = pathParams["id_producto"];
                console.log("handleApigtwEvent::idProduct", idProduct);
                if(idProduct != "" || idProduct != undefined){
                    response = await getProductUC(idProduct, stage) 
                }
            }
            break;
        case "PUT":
            //actualizar cantidad de un producto
            if(resource == '/producto'){
                const body = apigtwEvent["body"]
                console.log("handlerApigtwEvent::Body", body);
                response = await updateProductsUC(stage, body) 
            }
        break;
    }
    return response;
}

export const verifyToken = async(token) => {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: "us-east-2_vUuuGCj2W",
      tokenUse: "id",
      clientId: "16e4puvndqb2kirmv9fpnu0ujq",
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
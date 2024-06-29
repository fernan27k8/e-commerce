import { getProductUC } from "../../domain/use_cases/uc_get_product.mjs";
import { listProductsUC } from "../../domain/use_cases/uc_list_products.mjs";
import { updateProductsUC } from "../../domain/use_cases/uc_put_product.mjs";

export const apigtwAdapter = async (apigtwEvent, stage)  => {
    let response = {};

    // Obtener los encabezados del evento
    const headers = apigtwEvent["headers"];
    console.log("handler::headers", headers)

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
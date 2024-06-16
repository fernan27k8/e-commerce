import { getProductUC } from "../../domain/use_cases/uc_get_product.mjs";
import { listProductsUC } from "../../domain/use_cases/uc_list_products.mjs";

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
    }
    return response;
}
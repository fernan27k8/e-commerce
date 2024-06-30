import { addCompra } from "../../adapters/secundary/dynamodb.mjs";
import { paymentWebService } from "../../adapters/secundary/webServicePayment.mjs";
import { productWebService } from "../../adapters/secundary/webServiceProducts.mjs";

export const addCompraRepository = async (stage, body) => {
    let responseBuy = {};
    let responseStock = {};
    let GenResponse = {};

    try {
        const paymentResponse = await paymentWebService(body);
        console.log("handle::paymentStatus: ", paymentResponse.status);

        if (paymentResponse.status === "SUCCESS") {
            //Se añade el registro de compra
            responseBuy = await addCompra(stage, body);
            console.log("Compra realizada exitosamente");
            //Se restan los productos del stock
            responseStock = await productWebService(body);
            console.log("Productos extraidos...")
            GenResponse = { status: 'SUCCESS', message: "Proceso exitoso" };
        } else {
            GenResponse = paymentResponse;
        }
    } catch (error) {
        console.error("Error in addCompraRepository: ", error);
        GenResponse = { status: 'ERROR', message: error.message };
    }

    return GenResponse;
};


/*JSON REQUEST
{
    "status": "",
    "price": 00,
    "buy_id": "",
    "user_id": "",
    "car_id": "",

    "products": [ {
        "id_product": "",
        "amount": ""
    },
    {
        "id_product": "",
        "amount": ""
    }
     ],
    
    "paymentData": {
        "idTransaction": "XXX123-",
        "amount": 10.00, 
        "paymentMethod": "CC", 
        "paymentMethodData": {
            "cardNumber": 123, 
            "holderName": "XXX",
            "expirationDate": "YYYY-MM-DD", 
            "cvv": 123 
        }
    }
    
}
*/
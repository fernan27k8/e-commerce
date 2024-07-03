import { addCompra, createCar } from "../../adapters/secundary/dynamodb.mjs";
import { paymentWebService } from "../../adapters/secundary/webServicePayment.mjs";
import { productWebService } from "../../adapters/secundary/webServiceProducts.mjs";

export const addCompraRepository = async (stage, id_usuario, id_carrito, body) => {
    let responseBuy = {};
    let responseStock = {};
    let GenResponse = {};

    try {
        const paymentResponse = await paymentWebService(body);
        console.log("handle::paymentStatus: ", paymentResponse.status);

        if (paymentResponse.status === "SUCCESS") {
            //Se añade el registro de compra
            responseBuy = await addCompra(stage, id_usuario, id_carrito, body);
            console.log("Compra realizada exitosamente");
            //Se restan los productos del stock
            responseStock = await productWebService(body);
            console.log("Productos extraidos...")
            //Se genera un nuevo carrito para el ususario
            const newCar = await createCar(stage, id_usuario);
            console.log("Carrito creado...", newCar);
            GenResponse = { status: 'SUCCESS', message: "Proceso exitoso", Car: newCar };
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
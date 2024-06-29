import { addCompra } from "../../adapters/secundary/dynamodb.mjs";
import { paymentWebService } from "../../adapters/secundary/webService.mjs";


export const addCompraRepository = async (stage, body) => {
    let response = {};
    let paymentResponse = {};

    responsePayment = paymentWebService(body);
    console.log("handle::paymentStatus: ", responsePayment.status);
    if(responsePayment.status == "SUCCESS"){
        response = await addCompra(stage, body);
    }

    return response;
}

/*JSON REQUEST
{
    "status": "",
    "price": 00,
    "date": "",
    "GSIpk": "",

    "products": [
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
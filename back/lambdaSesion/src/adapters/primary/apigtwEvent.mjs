import { registerUser } from "../../domain/use_cases/uc_addUser.mjs";
import { logInUser } from "../../domain/use_cases/uc_logIn.mjs";
import { logOutUser } from "../../domain/use_cases/uc_logOut.mjs";
export const apigtwAdapter = async (apigtwEvent, stage) => {
  const headers = apigtwEvent["headers"];
  const xMytoken = headers["xmytoken"];
  const httpMethod = apigtwEvent["httpMethod"];
  const resource = apigtwEvent["resource"];

  let response = {};

  if (httpMethod !== "POST") {
    console.error("Método HTTP no compatible:", httpMethod);
    response = {
      statusCode: 405,
      body: JSON.stringify({ message: "Método no permitido" }),
    };
    return response;
  }
  const body = apigtwEvent["body"];
  console.log("Body:",body)
  switch (resource) {
    case "/usuario/signUp":
      response = await registerUser(stage, body);
      break;
    case "/usuario/logIn":
      response = await logInUser(stage,body);
      break;
    case "/usuario/logOut":
      const headers = apigtwEvent["headers"];
      console.log("handleApigtwEvent::headers",headers);
      const refreshToken = headers["refreshtoken"];
      console.log("handleApigtwEvent::refreshToken", refreshToken);
      console.log("handleApigtwEvent::solicitud de cierre de sesión");
      response = await logOutUser(stage, xMytoken, refreshToken);
      break;

    default:
      console.error("Recurso no compatible para POST:", resource);
      response = {
        statusCode: 404,
        body: JSON.stringify({ message: "Recurso no encontrado" }),
      };
  }

  return response;
};

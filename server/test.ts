import { ControllerUserData } from "./controllerUserData";

const controller = new ControllerUserData();

async function name() {
  // console.log( await controller.createUser("nume","cristi12@admin.com","parola","parola","0791423994"));
  // console.log (await controller.verificareOTP("288610","miloiuc4@gmail.com"))
  console.log(await controller.login("cristi12@admin.com", "parola"));
}

name();

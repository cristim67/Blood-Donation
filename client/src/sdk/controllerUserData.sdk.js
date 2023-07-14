/**
* This is an auto generated code. This code should not be modified since the file can be overwriten
* if new genezio commands are executed.
*/

import { Remote } from "./remote.js"

export class ControllerUserData {
  static remote = new Remote("http://127.0.0.1:8083/ControllerUserData")

  static async createUser(username, email, password, cpassword, phone) {
    return ControllerUserData.remote.call("ControllerUserData.createUser", username, email, password, cpassword, phone)
  }

  static async verificareOTP(code, email) {
    return ControllerUserData.remote.call("ControllerUserData.verificareOTP", code, email)
  }

  static async login(email, parola) {
    return ControllerUserData.remote.call("ControllerUserData.login", email, parola)
  }

}

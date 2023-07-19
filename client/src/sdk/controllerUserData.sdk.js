/**
* This is an auto generated code. This code should not be modified since the file can be overwriten
* if new genezio commands are executed.
*/

import { Remote } from "./remote.js"

export class ControllerUserData {
  static remote = new Remote("https://3iuav5j2ldbr734uln6dhykdku0qjssn.lambda-url.eu-central-1.on.aws/ControllerUserData")

  static async createUser(username, email, password, cpassword, phone) {
    return ControllerUserData.remote.call("ControllerUserData.createUser", username, email, password, cpassword, phone)
  }

  static async verificareOTP(code, email) {
    return ControllerUserData.remote.call("ControllerUserData.verificareOTP", code, email)
  }

  static async login(email, parola) {
    return ControllerUserData.remote.call("ControllerUserData.login", email, parola)
  }

  static async sendMessage(name, prenume, email, phone, message) {
    return ControllerUserData.remote.call("ControllerUserData.sendMessage", name, prenume, email, phone, message)
  }

  static async getEventsCalendar() {
    return ControllerUserData.remote.call("ControllerUserData.getEventsCalendar")
  }

  static async addPersonCalendar(email, startDate, endDate, number) {
    return ControllerUserData.remote.call("ControllerUserData.addPersonCalendar", email, startDate, endDate, number)
  }

}

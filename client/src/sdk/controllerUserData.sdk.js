/**
* This is an auto generated code. This code should not be modified since the file can be overwriten
* if new genezio commands are executed.
*/

import { Remote } from "./remote.js"

export class ControllerUserData {
  static remote = new Remote("http://127.0.0.1:8083/ControllerUserData")

  static async createUser(username, email, password, confirmedPassword, phone) {
    return ControllerUserData.remote.call("ControllerUserData.createUser", username, email, password, confirmedPassword, phone)
  }

  static async verificareOTP(code, email) {
    return ControllerUserData.remote.call("ControllerUserData.verificareOTP", code, email)
  }

  static async login(email, password) {
    return ControllerUserData.remote.call("ControllerUserData.login", email, password)
  }

  static async sendMessage(firstName, secondName, email, phone, message) {
    return ControllerUserData.remote.call("ControllerUserData.sendMessage", firstName, secondName, email, phone, message)
  }

  static async getEventsCalendar() {
    return ControllerUserData.remote.call("ControllerUserData.getEventsCalendar")
  }

  static async addPersonCalendar(email, startDate, endDate, number) {
    return ControllerUserData.remote.call("ControllerUserData.addPersonCalendar", email, startDate, endDate, number)
  }

  static async deletePerson(email) {
    return ControllerUserData.remote.call("ControllerUserData.deletePerson", email)
  }

}

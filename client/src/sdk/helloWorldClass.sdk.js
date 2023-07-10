/**
* This is an auto generated code. This code should not be modified since the file can be overwriten
* if new genezio commands are executed.
*/

import { Remote } from "./remote.js"

export class HelloWorldClass {
  static remote = new Remote("http://127.0.0.1:8083/HelloWorldClass")

  static async helloWorld() {
    return HelloWorldClass.remote.call("HelloWorldClass.helloWorld")
  }

  static async hello(name, location) {
    return HelloWorldClass.remote.call("HelloWorldClass.hello", name, location)
  }

}

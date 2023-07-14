import { RowDataPacket } from "mysql2";

export interface IUser extends RowDataPacket{
  id?:number,
  email:string,
  password:string,
  code:string,
  status:string,
  phone:string,
  checkin:string
}
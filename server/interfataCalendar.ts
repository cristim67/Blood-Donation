import { RowDataPacket } from "mysql2";

export interface ICalendar extends RowDataPacket {
  id?: number;
  title: string;
  startDate: string;
  endDate: string;
  n_calendar: string;
}

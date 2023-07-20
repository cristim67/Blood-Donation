import bcryptjs from "bcryptjs";
import { Send_mailer } from "./mailer";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

export class ControllerUserData {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(
    username: string,
    email: string,
    password: string,
    confirmedPassword: string,
    phone: string,
  ) {
    try {
      // Check if passwords match
      if (password !== confirmedPassword) {
        return { status: false, message: "Parolele nu corespund." };
      }

      // Validate phone number using a regex
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone)) {
        return { status: false, message: "Numarul de telefon nu este valid." };
      }

      // Check if email already exists in the database
      const existingUser = await this.prisma.usertable.findUnique({
        where: { email: email },
      });

      if (existingUser) {
        return { status: false, message: "Emailul deja exista." };
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      // Generate a verification code
      const code: string = Math.floor(
        Math.random() * (999999 - 111111) + 111111,
      ).toString();

      const status = "notverified";

      // Create the user in the database
      await this.prisma.usertable.create({
        data: {
          name: username,
          email: email,
          password: hashedPassword,
          code: code,
          status: status,
          phone: phone,
        },
      });

      // Send verification email
      const subject = "Cod pentru verificare email";
      const message = `Codul de verificare este ${code}`;
      const mailer = new Send_mailer();

      const emailSent = await mailer.send(
        process.env.MAIL_USER,
        email,
        subject,
        message,
      );

      if (emailSent) {
        return { status: true, message: "Succes!" };
      } else
        return {
          status: false,
          message: "Eroare interna. Te rog reincearca mai tarziu!",
        };
    } catch (error) {
      console.error(error);
      return {
        status: false,
        message: "Eroare interna. Te rog reincearca mai tarziu!",
      };
    }
  }

  async verificareOTP(code: number, email: string) {
    try {
      email = email.slice(1, email.length - 1);
      const stringCode = code.toString();
      // Find the user with the provided code and email
      const user = await this.prisma.usertable.findUnique({
        where: { code: stringCode, email: email },
      });

      if (user) {
        if (user.status === "verified") {
          return { status: true, message: "Cont deja valid", mail: email };
        } else {
          // Update the user's status and code in the database
          await this.prisma.usertable.update({
            where: { id: user.id },
            data: { code: "0", status: "verified" },
          });

          return { status: true, message: "Sesiune start!" };
        }
      } else {
        // Check if user exists with the provided email
        const existingUser = await this.prisma.usertable.findUnique({
          where: { email: email },
        });

        if (existingUser) {
          return {
            status: false,
            message: "Ati introdus codul gresit!",
            mail: email,
          };
        } else {
          return {
            status: false,
            message: "Eroare baza de date",
          };
        }
      }
    } catch (error) {
      console.error(error);
      return {
        status: false,
        message: "Eroare interna. Te rog reincearca mai tarziu!",
      };
    }
  }

  async login(email: string, password: string) {
    try {
      // Find the user with the provided email
      const user = await this.prisma.usertable.findUnique({
        where: { email: email },
      });

      if (user) {
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcryptjs.compare(password, user.password);

        if (passwordMatch) {
          if (user.status === "verified") {
            return { status: "Calendar", message: "Succes" };
          } else {
            return { status: "2fa", message: "Redirect 2fa" };
          }
        } else {
          return { status: "Eroare", message: "Parolele nu se potrivesc" };
        }
      } else {
        return {
          status: "Eroare",
          message: "Emailul nu exista in baza de date",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        status: "Eroare",
        message: "Eroare interna. Te rog reincearca mai tarziu!",
      };
    }
  }

  async sendMessage(
    firstName: string,
    secondName: string,
    email: string,
    phone: string,
    message: string,
  ) {
    try {
      const subject =
        "Contact nume - " +
        firstName +
        " prenume - " +
        secondName +
        " email - " +
        email +
        " telefon - " +
        phone;

      const mailer = new Send_mailer();
      const emailSent = await mailer.send(
        process.env.MAIL_USER,
        process.env.MAIL_SUPPORT,
        subject,
        message,
      );

      if (emailSent) {
        return { status: true, message: "Mail trimis" };
      } else {
        return { status: false, message: "Nu s-a putut trimite mailul" };
      }
    } catch (error) {
      console.error(error);
      return {
        status: false,
        message: "Eroare interna. Te rog reincearca mai tarziu!",
      };
    }
  }

  async getEventsCalendar() {
    try {
      // Find all events in the database
      const events = await this.prisma.events.findMany();

      // Convert the events to the desired format for the calendar
      const convertedArray = events.map((events) => ({
        title: events.title,
        start: new Date(events.start_event).toISOString(),
        end: new Date(events.end_event).toISOString(),
      }));

      console.log(convertedArray);
      return convertedArray;
    } catch (error) {
      console.error("Eroare interna. Te rog reincearca mai tarziu!", error);
      return [];
    }
  }

  async addPersonCalendar(
    email: string,
    startDate: string,
    endDate: string,
    number: number,
  ) {
    try {
      email = email.slice(1, email.length - 1);

      // Check if an event with the provided title (email) already exists
      const existingEvent = await this.prisma.events.findFirst({
        where: { title: email },
      });

      if (existingEvent) {
        return { status: false, mesaj: "Aveti deja o programare!" };
      } else {
        // Insert the new event into the database
        await this.prisma.events.create({
          data: {
            title: email,
            start_event: new Date(startDate),
            end_event: new Date(endDate),
            calendar_n: number,
          },
        });

        return { status: true, mesaj: "S-a adaugat!" };
      }
    } catch (error) {
      console.error("Eroare de conectare la baza de date", error);
      return {
        status: false,
        mesaj: "Eroare interna. Te rog reincearca mai tarziu!",
      };
    }
  }
}

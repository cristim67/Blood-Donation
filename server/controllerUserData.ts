import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Send_mailer } from "./mailer";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

export type CreateUserResponse = {
  status: boolean;
  message: string;
};

export type CheckUserOTP = {
  status: boolean;
  message: string;
  mail?: string;
  token?: string;
};

export type LoginUserResponse = {
  status: string;
  message: string;
  token?: string;
};

export type SendMessageResponse = {
  status: boolean;
  message: string;
};

export type AddPersonResponse = {
  status: boolean;
  message: string;
};

export type DeletePersonResponse = {
  status: boolean;
  message: string;
};

export type CheckSessionResponse = {
  status: boolean;
};

export type AddNewsletterResponse = {
  status: boolean;
  message: string;
};

export type ForgotPasswordResponse = {
  status: boolean;
  message: string;
};

export type ResetCodeResponse = {
  status: boolean;
  message: string;
  token?: string;
};

export type ChangePasswordResponse = {
  status: boolean;
  message: string;
};

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
  ): Promise<CreateUserResponse> {
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

  async verificareOTP(code: number, email: string): Promise<CheckUserOTP> {
    try {
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
          const token = jwt.sign(user, process.env.SECRET_KEY_JWT!, {
            expiresIn: 3600, // 1 week
          });
          const activeSession = await this.prisma.session.create({
            data: {
              email: email,
              token: token,
            },
          });
          if (activeSession)
            return { status: true, message: "Sesiune start!", token: token };
          else {
            return {
              status: false,
              message: "Eroare interna. Te rog reincearca mai tarziu!",
            };
          }
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

  async login(email: string, password: string): Promise<LoginUserResponse> {
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
            const token = jwt.sign(user, process.env.SECRET_KEY_JWT!, {
              expiresIn: 3600, // 1 week
            });
            const ActiveSession = await this.prisma.session.create({
              data: {
                email: email,
                token: token,
              },
            });
            if (ActiveSession)
              return { status: "Calendar", message: "Succes", token: token };
            else {
              return {
                status: "Eroare",
                message: "Eroare interna. Te rog reincearca mai tarziu!",
              };
            }
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

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    try {
      // Find the user with the provided email
      const user = await this.prisma.usertable.findUnique({
        where: { email: email },
      });

      if (user) {
        const code: string = Math.floor(
          Math.random() * (999999 - 111111) + 111111,
        ).toString();
        //Assigned the code for verification
        await this.prisma.usertable.update({
          where: { id: user.id },
          data: { code: code },
        });

        //Send the email with that code
        const subject = "Cod pentru resetare parola";
        const message = `Codul de verificare este ${code}`;
        const mailer = new Send_mailer();

        const emailSent = await mailer.send(
          process.env.MAIL_USER,
          email,
          subject,
          message,
        );

        //if it was sent
        if (emailSent) {
          return { status: true, message: "Succes!" };
        } else
          return {
            status: false,
            message: "Eroare interna. Te rog reincearca mai tarziu!",
          };
      } else {
        return {
          status: false,
          message: "Emailul nu exista in baza de date",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        status: false,
        message: "Eroare interna. Te rog reincearca mai tarziu!",
      };
    }
  }

  async resetCode(email: string, code: string): Promise<ResetCodeResponse> {
    try {
      const stringCode = code.toString();
      // Find the user with the provided code and email
      const user = await this.prisma.usertable.findUnique({
        where: { code: stringCode, email: email },
      });

      if (user) {
        await this.prisma.usertable.update({
          where: { id: user.id },
          data: { code: "0", status: "verified" },
        });

        //Create session token
        const token = jwt.sign(user, process.env.SECRET_KEY_JWT!, {
          expiresIn: 3600, // 1 week
        });

        const ActiveSession = await this.prisma.session.create({
          data: {
            email: email,
            token: token,
          },
        });
        if (ActiveSession)
          return { status: true, message: "succes", token: token };
        else {
          return {
            status: false,
            message: "Eroare interna. Te rog reincearca mai tarziu!",
          };
        }
      } else return { status: false, message: "Email negasit!" };
    } catch (error) {
      console.error(error);
      return {
        status: false,
        message: "Eroare interna. Te rog reincearca mai tarziu!",
      };
    }
  }

  async changePassword(
    email: string,
    password: string,
    confirmedPassword: string,
    token: string,
  ): Promise<ChangePasswordResponse> {
    try {
      if (password !== confirmedPassword) {
        return { status: false, message: "Parolele nu corespund." };
      }
      //Check session
      const ActiveSession = await this.checkSession(token);

      if (ActiveSession) {
        // Check if email already exists in the database
        const existingUser = await this.prisma.usertable.findUnique({
          where: { email: email },
        });
        if (existingUser) {
          //Create HashPassword and update User password
          const hashedPassword = await bcryptjs.hash(password, 10);
          await this.prisma.usertable.update({
            where: { id: existingUser.id },
            data: { password: hashedPassword },
          });
        } else {
          return {
            status: false,
            message: "Eroare interna. Te rog reincearca mai tarziu!",
          };
        }
        return {
          status: true,
          message: "succes",
        };
      } else {
        return {
          status: false,
          message: "Eroare interna. Te rog reincearca mai tarziu!",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        status: false,
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
  ): Promise<SendMessageResponse> {
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

  async getEventsCalendar(
    token: string,
    numberCalendar: string,
  ): Promise<
    {
      end: string;
      start: string;
      title: string;
    }[]
  > {
    try {
      //Check session
      const ActiveSession = await this.checkSession(token);

      if (ActiveSession) {
        // Find all events in the database
        const events = await this.prisma.events.findMany({
          where: { calendar_n: numberCalendar },
        });
        // Convert the events to the desired format for the calendar
        return events.map((events) => ({
          title: events.title,
          start: new Date(events.start_event).toISOString(),
          end: new Date(events.end_event).toISOString(),
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.error("Eroare interna. Te rog reincearca mai tarziu!", error);
      return [];
    }
  }

  async addPersonCalendar(
    token: string,
    email: string,
    startDate: string,
    endDate: string,
    number: string,
  ): Promise<AddPersonResponse> {
    try {
      //Check session
      const ActiveSession = await this.checkSession(token);

      if (ActiveSession) {
        // Check if an event with the provided title (email) already exists
        const existingEvent = await this.prisma.events.findFirst({
          where: { title: email },
        });

        if (existingEvent) {
          return { status: false, message: "Aveti deja o programare!" };
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

          return { status: true, message: "S-a adaugat!" };
        }
      } else {
        return {
          status: false,
          message: "Eroare interna. Te rog reincearca mai tarziu!",
        };
      }
    } catch (error) {
      console.error("Eroare de conectare la baza de date", error);
      return {
        status: false,
        message: "Eroare interna. Te rog reincearca mai tarziu!",
      };
    }
  }

  async deletePerson(
    token: string,
    email: string,
  ): Promise<DeletePersonResponse> {
    try {
      //Check session
      const ActiveSession = await this.checkSession(token);

      if (ActiveSession) {
        // Find the event to deleted
        const findEventToDeleted = await this.prisma.events.findUnique({
          where: { title: email },
        });
        // If the event exits, delete it
        if (findEventToDeleted) {
          const deletedUser = await this.prisma.events.delete({
            where: {
              title: email,
            },
          });
          if (deletedUser) return { status: true, message: "Event sters" };
          else {
            return { status: false, message: "Event negasit" };
          }
        } else {
          return {
            status: false,
            message: "Eroare interna. Te rog reincearca mai tarziu!",
          };
        }
      } else {
        return {
          status: false,
          message: "Eroare interna. Te rog reincearca mai tarziu!",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        status: false,
        message: "Eroare interna. Te rog reincearca mai tarziu!",
      };
    }
  }

  async checkSession(token: string): Promise<CheckSessionResponse> {
    // Check if token is not null
    if (token) {
      // Find the token
      const activeSession = await this.prisma.session.findFirst({
        where: { token: token.slice(1, token.length - 1) },
      });
      if (!activeSession) {
        return { status: false };
      }
      // Find the user with the email associated with the token
      const user = await this.prisma.session.findUnique({
        where: { email: activeSession.email },
      });

      if (!user) {
        return { status: false };
      }

      return { status: true };
    } else return { status: false };
  }

  async addNewsletter(email: string): Promise<AddNewsletterResponse> {
    try {
      // Check if email already exists in the database
      const existingUser = await this.prisma.newsletter.findUnique({
        where: { email: email },
      });

      if (existingUser) {
        return { status: false, message: "Emailul deja exista." };
      }
      // Add email in the database
      await this.prisma.newsletter.create({
        data: {
          email: email,
        },
      });
      return { status: true, message: "Emailul adaugat cu succes." };
    } catch (error) {
      console.error(error);
      return {
        status: false,
        message: "Eroare interna. Te rog reincearca mai tarziu!",
      };
    }
  }
}

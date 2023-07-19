import { database_connection } from "./database_connection";
import bcrypt from "bcrypt";
import { Send_mailer } from "./mailer";
import { IUser } from "./interfataUser";
import { ICalendar } from "./interfataCalendar";
import * as dotenv from "dotenv";

dotenv.config();

export class ControllerUserData {
  constructor() {}

  async createUser(
    username: string,
    email: string,
    password: string,
    cpassword: string,
    phone: string,
  ) {
    return new Promise((resolve) => {
      database_connection.connect((err) => {
        if (err) {
          return resolve({
            status: false,
            mesaj: "Nu s-a conectat la baza de date.",
          });
        }
        // console.log('Conectat');
      });

      console.log(username, email, password, cpassword, phone);

      let okPromise = false;

      let ok = true;

      if (password !== cpassword) {
        ok = false;
        okPromise = true;
        return resolve({ status: ok, mesaj: "Parolele nu corespund. " });
      }

      const phoneRegex = /^[0-9]{10}$/;

      if (!phoneRegex.test(phone)) {
        ok = false;
        okPromise = true;
        return resolve({
          status: ok,
          mesaj: "Numarul de telefon nu este valid. ",
        });
      }

      database_connection.query(
        `SELECT * FROM usertable WHERE email = '${email}'`,
        (err: Error | null, results: Array<IUser>) => {
          console.log(results);

          if (results !== undefined && results.length !== 0) {
            ok = false;
            okPromise = true;
            console.log("ajunge aici email exista");
            return resolve({ status: ok, mesaj: "Emailul deja exista" });
          } else {
            console.log("este undefined results");
            bcrypt.hash(password, 10, (err, hashedPassword) => {
              if (err) {
                ok = false;
                okPromise = true;
                return resolve({
                  status: ok,
                  mesaj: "Nu s-a putut cripta parola",
                });
              }

              let code: number = Math.floor(
                Math.random() * (999999 - 111111) + 111111,
              );
              let status = "notverified";
              database_connection.query(
                `INSERT INTO usertable (name, email, password, code, status,phone) VALUES ('${username}','${email}','${hashedPassword}','${code}','${status}','${phone}')`,
                async (error: Error | null, _results: any) => {
                  if (error || _results === undefined) {
                    ok = false;
                    okPromise = true;
                    console.log(error);
                    return resolve({
                      status: ok,
                      mesaj: "Nu s-a putut adauga in baza de date",
                    });
                  }
                  let subject = "Cod pentru verificare email";
                  let message = `Codul de verificare este ${code}`;
                  let mailer = new Send_mailer();

                  let mesaj = await mailer.send(
                    process.env.MAIL_USER,
                    email,
                    subject,
                    message,
                  );
                  if (mesaj === "Email Eroare") {
                    ok = false;
                    okPromise = true;
                    return resolve({
                      status: ok,
                      mesaj: "Nu s-a putut trimite mailul",
                    });
                  }
                },
              );
              console.log("Ok promise: ", okPromise);

              if (!okPromise) {
                return resolve({ status: ok, mesaj: "Succes!" });
              }
            });
          }
        },
      );
    });
  }

  async verificareOTP(code: string, email: string) {
    return new Promise((resolve) => {
      database_connection.connect((err) => {
        if (err) {
          return resolve({
            status: false,
            mesaj: "Eroare de conectare la baza de date",
          });
        }
        // console.log('Conectat');
      });

      email = email.slice(1, email.length - 1);

      // console.log(code, email.slice(1,email.length-1));
      database_connection.query(
        `SELECT * FROM usertable WHERE code = '${code}' AND email= '${email}'`,
        (err: Error | null, results: Array<IUser>) => {
          if (err) {
            return resolve({ status: false, mesaj: "Eroare baza de date" });
          }

          if (results !== undefined && results.length !== 0) {
            const statusUpdate = "verified";
            const codeUpdate = 0;
            database_connection.query(
              `UPDATE usertable SET code='${codeUpdate}', status= '${statusUpdate}' WHERE code='${code}'`,
              (error: Error | null, _results: any) => {
                if (_results) {
                  return resolve({ status: true, mesaj: "Sesiune start!" });
                } else {
                  return resolve({
                    status: false,
                    mesaj: "A esuat la actualizarea codului!",
                  });
                }
              },
            );
          } else {
            database_connection.query(
              `SELECT * FROM usertable WHERE email= '${email}'`,
              (errs: Error | null, __results: Array<IUser>) => {
                if (__results) {
                  if (__results[0].status === "verified") {
                    return resolve({
                      status: true,
                      mesaj: "Cont deja valid",
                      mail: email,
                    });
                  } else {
                    return resolve({
                      status: false,
                      mesaj: "Ati introdus codul gresit!",
                      mail: email,
                    });
                  }
                }
              },
            );
          }
        },
      );
    });
  }

  async login(email: string, parola: string) {
    return new Promise((resolve) => {
      database_connection.connect((err) => {
        if (err) {
          return resolve({
            status: "Eroare",
            mesaje: "Eroare la conectarea cu baza de date",
          });
        }
        // console.log('Conectat');
      });

      console.log(email, parola);
      database_connection.query(
        `SELECT * FROM usertable WHERE  email= '${email}'`,
        (err: Error | null, results: Array<IUser>) => {
          if (results !== undefined && results.length !== 0) {
            console.log(results[0].password);
            bcrypt.compare(parola, results[0].password, (err, __result) => {
              if (err) {
                return resolve({
                  status: "Eroare",
                  mesaje: "Parola nu a putut fi comparata",
                });
              }
              if (__result) {
                if (results[0].status === "verified")
                  resolve({ status: "Calendar", mesaje: "Succes" });
                else {
                  return resolve({ status: "2fa", mesaje: "Redirect 2fa" });
                }
              } else {
                return resolve({
                  status: "Eroare",
                  mesaje: "Parolele nu se potrivesc",
                });
              }
            });
          } else {
            return resolve({
              status: "Eroare",
              mesaje: "Emailul nu exista in baza de date",
            });
          }
        },
      );
    });
  }

  async sendMessage(
    name: string,
    prenume: string,
    email: string,
    phone: string,
    message: string,
  ) {
    return new Promise(async (resolve) => {
      let subject =
        "Contact nume - " +
        name +
        " prenume - " +
        prenume +
        " email - " +
        email +
        " telefon - " +
        phone;
      let mailer = new Send_mailer();
      let mesaj = await mailer.send(
        process.env.MAIL_USER,
        process.env.MAIL_SUPPORT,
        subject,
        message,
      );
      console.log(mesaj);
      if (mesaj === "Email Eroare") {
        return resolve({ status: false, mesaj: "Nu s-a putut trimite mailul" });
      } else {
        return resolve({ status: true, mesaj: "Mail trimis" });
      }
    });
  }

  async getEventsCalendar() {
    return new Promise((resolve) => {
      database_connection.connect((err) => {
        if (err) {
          return resolve({});
        }
        // console.log('Conectat');
      });

      database_connection.query(
        `SELECT * FROM events`,
        (err: Error | null, results: Array<ICalendar>) => {
          if (err) {
            console.error("Eroare de conectare la baza de date calendar", err);
            return resolve({});
          }

          const convertedArray = results.map((results) => ({
            title: results.title,
            start: new Date(results.start_event).toISOString(),
            end: new Date(results.end_event).toISOString(),
          }));
          console.log(convertedArray);
          return resolve(convertedArray);
        },
      );
    });
  }

  async addPersonCalendar(
    email: string,
    startDate: string,
    endDate: string,
    number: string,
  ) {
    return new Promise((resolve) => {
      email = email.slice(1, email.length - 1);

      database_connection.connect((err) => {
        if (err) {
          return resolve({
            status: "Eroare",
            mesaje: "Eroare la conectarea cu baza de date",
          });
        }
        console.log("Conectat");
      });

      database_connection.query(
        `SELECT * FROM events WHERE  title= '${email}'`,
        (err: Error | null, results: Array<ICalendar>) => {
          if (results !== undefined && results.length !== 0) {
            return resolve({
              status: false,
              mesaj: "Aveti deja o programare!",
            });
          } else {
            database_connection.query(
              `INSERT INTO events (title, start_event, end_event, calendar_n) VALUES ('${email}','${startDate}','${endDate}','${number}')`,
              async (error: Error | null, _results: any) => {
                if (error || _results === undefined) {
                  return resolve({
                    status: false,
                    mesaj: "Nu s-a putut adauga in baza de date",
                  });
                } else {
                  return resolve({ status: true, mesaj: "S-a adaugat!" });
                }
              },
            );
          }
        },
      );
    });
  }
}

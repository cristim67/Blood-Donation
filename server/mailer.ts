import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();
export class Send_mailer {
  constructor() {}

  async send(_from: any, _to: any, _subject: string, _text: string) {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: _from,
      to: _to,
      subject: _subject,
      text: _text,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      return false;
    }
  }
}

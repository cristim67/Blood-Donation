import * as nodemailer from 'nodemailer'

export class Send_mailer{
  
  constructor()
  {

  }

  async send (_from:string,_to:string,_subject:string,_text:string){

  
  const transporter = nodemailer.createTransport({
    host:'smtp.hostinger.com',
 
    service: 'thunderbird',
    auth: {
      user: 'donare@lsebucuresti.org',
      pass: 'Donarelse12!',
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
    return "Email trimis";
  }
  catch(error)
  {
    return "Email Eroare";
  }
}
}
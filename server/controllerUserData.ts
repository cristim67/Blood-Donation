import { database_connection } from "./database_connection";
import bcrypt from 'bcrypt';
import { Send_mailer } from "./mailer";
import { IUser } from "./interfata";

export class ControllerUserData{
    constructor(){
        
    }
    async createUser(
        
        username : string,
        email : string,
        password : string,
        cpassword : string,
        phone: string) {
            
            console.log(username,email,password,cpassword,phone)
        var okPromise=false;
        
        return new Promise((resolve, reject) => {

            let ok=true;

        if( password !== cpassword ){
           ok=false;
           okPromise=true;
           resolve ({status: ok, mesaj: "Parolele nu corespund. "});
           return;
        }
        const phoneRegex = /^[0-9]{10}$/;
        if(! phoneRegex.test(phone))
        {
            ok=false;
            okPromise=true;
            resolve({status:ok,mesaj:"Numarul de telefon nu este valid. "})
            return;
        }

        database_connection.query(`SELECT * FROM usertable WHERE email = '${email}'`, (err : Error | null, results: Array<IUser>) => {
            
            console.log(results)

            if(results!==undefined && results.length !== 0){  
                ok=false;
                okPromise=true;
                console.log("ajunge aici email exista")              
                resolve ({status: ok, mesaj: "Emailul deja exista"});
                return;
            }

            else {
                bcrypt.hash(password,10,(err,hashedPassword)=>{
                    if (err)
                     {
                        ok=false;
                        okPromise=true;
                        resolve({status: ok,mesaj: "Nu s-a putut cripta parola"});
                        return;
                     }

                     let code:number=Math.floor(Math.random()*(999999-111111)+111111);
                     let status="notverified"
                     
                     database_connection.query(`INSERT INTO usertable (name, email, password, code, status,phone) VALUES ('${username}','${email}','${hashedPassword}','${code}','${status}','${phone}')`, async(error : Error | null, _results: any) => {
                         if (error || _results===undefined) {
                         ok=false;
                         okPromise=true;
                         resolve({status: ok,mesaj: "Nu s-a putut adauga in baza de date"});
                         return;
                         }
                         let subject = "Cod pentru verificare email";
                         let message = `Codul de verificare este ${code}`;
                         let mailer= new Send_mailer;

                         let mesaj=await mailer.send("donare@lsebucuresti.org",email,subject,message);
                         if(mesaj==="Email Eroare")
                         {
                            ok=false;
                            okPromise=true;
                            resolve({status: ok,mesaj: "Nu s-a putut trimite mailul"});
                            return;
                         }
             
                     });
                })

            }
            console.log("Ok promise: ", okPromise)

            if(okPromise===false){
            resolve({status:ok,mesaj:"Succes!"});
            return;
        }
        });
 
    })


}; 

    

    async verificareOTP(
        code : string,
        email : string
    )
    {
        email=email.slice(1,email.length-1);

        // console.log(code, email.slice(1,email.length-1));

        return new Promise((resolve, reject) => {
            

            database_connection.query(`SELECT * FROM usertable WHERE code = '${code}' AND email= '${email}'`, (err : Error | null, results: Array<IUser>) => {

                if(err)
                    {
                        console.log(results[0].status);

                        resolve({status:false,mesaj:"Eroare baza de date"})
                        return;
                    }

                if(results!==undefined && results.length !== 0){   
                    const statusUpdate="verified";
                    const codeUpdate=0;
                    database_connection.query(`UPDATE usertable SET code='${codeUpdate}', status= '${statusUpdate}' WHERE code='${code}'`,(error:Error | null, _results:any) => {
                        if(_results){
                            resolve({status:true,mesaj:"Sesiune start!"});
                            return;
                        }
                        else{
                            resolve({status:false, mesaj:"A esuat la actualizarea codului!"})
                            return;
                        }
                    });
                }

                else {
                    database_connection.query(`SELECT * FROM usertable WHERE email= '${email}'`, (errs : Error | null, __results: Array<IUser>) =>{
                        if(__results)
                        {
                            if(__results[0].status==="verified")
                                {
                                    resolve({status:true,mesaj:"Cont deja valid",mail:email});
                                    return;
                                }
                            else{
                                resolve({status:false,mesaj:"Ati introdus codul gresit!",mail:email});
                                return;
                            }
                        }
               
                    
                    })
                }
        });
    });

}

    async login(    
        email : string,
        parola : string){
            
            console.log(email,parola);
        return new Promise((resolve, reject) => {

            database_connection.query(`SELECT * FROM usertable WHERE  email= '${email}'`, (err : Error | null, results: Array<IUser>) => {
                
                if(results!==undefined && results.length !== 0){
                      console.log(results[0].password)
                      bcrypt.compare(parola, results[0].password, (err, __result) => {
                        if (err) {
                            resolve({status:"Eroare",mesaje:"Parola nu a putut fi comparata"})
                          return;
                        }
                        if(__result)
                        {
                            if(results[0].status==="verified")
                            resolve({status:"Calendar",mesaje:"Succes"})
                            else (resolve({status:"2fa",mesaje:"Redirect 2fa"}))
                        }
                        else{
                            resolve({status:"Eroare", mesaje:"Parolele nu se potrivesc"});
                        }
                    });
        
                }
                else {
                    resolve({status:"Eroare", mesaje:"Emailul nu exista in baza de date"});
                    return;
                }
            })

        });

    }

    



}
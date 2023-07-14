import * as mysql from 'mysql2'

export const database_connection=mysql.createConnection({
    host:"srv858.hstgr.io",
    user: "u824022186_admindonare",
    password:"?LcS@4y6Ns4",
    database:"u824022186_donare_editia3"    
});

database_connection.connect((err) => {
    if (err) {
      console.error('Eroare de conectare', err);
      return;
    }
    console.log('Conectat');
});

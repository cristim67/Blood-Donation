import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from "react";
import { Link } from 'react-router-dom';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [prenume,setPrenume]=useState('');
    const [passconfirm, setPassConfirm]=useState('');
    const [telefon, setTelefon]=useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
      <div className='formulare'>
        <div className="auth-form-container SpatiereRegister">
            <h2 className="SpatiereRegister">Inregistrare</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Nume Complet</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Nume" />
            <label htmlFor="telefon">Telefon</label>
            <input value={telefon} name="telefon" onChange={(e) => setTelefon(e.target.value)} id="telefon" placeholder="Telefon" />
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="nume@stud.etti.upb.ro" id="email" name="email" />
            <label htmlFor="password">Parola</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <label htmlFor="password">Confirmare Parola</label>
            <input value={passconfirm} onChange={(e) => setPassConfirm(e.target.value)} type="password" placeholder="********" id="password" name="password" />
           
            <button type="submit" className='button-form'>Înregistrează-mă</button>
        </form>
        <Link to="/login">
        <button className="link-btn">Ai deja cont? Loghează-te aici!</button>
        </Link>
    </div>
    </div>
    )
}


export default Register;

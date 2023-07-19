import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, {useState} from "react";
import {Link} from 'react-router-dom';
import {ControllerUserData} from '../../sdk/controllerUserData.sdk';
import localStorage from 'local-storage';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [passconfirm, setPassConfirm] = useState('');
    const [telefon, setTelefon] = useState('');
    const [eroare, setEroare] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const Status = await ControllerUserData.createUser(name, email, pass, passconfirm, telefon);
        console.log(Status);
        const status = Status.status;
        console.log(Status);
        if (status) {
            localStorage.set('email', email);
            window.location.replace("/user-otp");
        } else {
            setEroare(Status.mesaj);
        }
    }

    return (
        <div className='formulare'>
            <div className="auth-form-container SpatiereRegister">
                <h2 className="SpatiereRegister">Inregistrare</h2>
                <form className="register-form" onSubmit={handleSubmit}>

                    <p>
                        {eroare ? eroare : ''}
                    </p>

                    <label htmlFor="name">Nume Complet</label>
                    <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name"
                           placeholder="Nume" required/>
                    <label htmlFor="telefon">Telefon</label>
                    <input value={telefon} name="telefon" onChange={(e) => setTelefon(e.target.value)} id="telefon"
                           placeholder="Telefon" required/>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                           placeholder="nume@stud.etti.upb.ro" id="email" name="email" required/>
                    <label htmlFor="password">Parola</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********"
                           id="password" name="password" required/>
                    <label htmlFor="password">Confirmare Parola</label>
                    <input value={passconfirm} onChange={(e) => setPassConfirm(e.target.value)} type="password"
                           placeholder="********" id="cpassword" name="cpassword" required/>

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

import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className='formulare'>
        <div className="auth-form-container">
            <h2 className="SpatiereRegister">Autentificare</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="nume@stud.etti.upb.ro" id="email" name="email" />
                <label htmlFor="password">Parola</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit" className='button-form'>Conectează-mă!</button>
            </form>
            <Link to="/register">
            <button className="link-btn " >Nu ai cont? Înregistrează-te aici!</button>
            </Link>
        </div>
        </div>
    )
}
export default Login;
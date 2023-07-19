import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, {useState} from "react";
import {Link} from 'react-router-dom';
import {ControllerUserData} from '../../sdk/controllerUserData.sdk';

export const UserOtp = (props) => {

    const [code, setCode] = useState('');
    const [eroare, setEroare] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Status = await ControllerUserData.verificareOTP(code, localStorage.getItem('email'));
        console.log(Status);
        const status = Status.status;
        if (status) {
            window.location.replace("/calendar");
        } else {
            setEroare(Status.mesaj);
        }
    }

    return (
        <div className='formulare'>
            <div className="auth-form-container SpatiereRegister">
                <h2 className="SpatiereRegister">Verificare Email
                    - {localStorage.getItem('email').slice(1, localStorage.getItem('email').length - 1)}</h2>
                <form className="register-form" onSubmit={handleSubmit}>

                    <p>
                        {eroare ? eroare : ''}
                    </p>

                    <label htmlFor="name">Code</label>
                    <input value={code} name="code" onChange={(e) => setCode(e.target.value)} id="code"
                           placeholder="code" required/>
                    <button type="submit" className='button-form'>Verificare</button>
                </form>
                <Link to="/">
                    <button className="link-btn">Vrei sa te verifici mai tarziu? Apasa aici</button>
                </Link>
            </div>
        </div>
    )
}
export default UserOtp;

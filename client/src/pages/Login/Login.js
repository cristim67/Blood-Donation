import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ControllerUserData } from "../../sdk/controllerUserData.sdk";
import localStorage from "local-storage";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [eroare, setEroare] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const Status = await ControllerUserData.login(email, pass);
    console.log(Status);
    const status = Status.status;
    if (status === "Calendar") {
      localStorage.set("email", email);
      window.location.replace("/calendar");
    } else if (status === "2fa") {
      localStorage.set("email", email);
      window.location.replace("/user-otp");
    } else if (status === "Eroare") {
      setEroare(Status.mesaje);
    }
  };

  return (
    <div className="formulare">
      <div className="auth-form-container">
        <h2 className="SpatiereRegister">Autentificare</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <p>{eroare ? eroare : ""}</p>

          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="nume@stud.etti.upb.ro"
            id="email"
            name="email"
          />
          <label htmlFor="password">Parola</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button type="submit" className="button-form">
            Conectează-mă!
          </button>
        </form>
        <Link to="/register">
          <button className="link-btn ">
            Nu ai cont? Înregistrează-te aici!
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Login;

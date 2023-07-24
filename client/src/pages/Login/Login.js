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

    const status = await ControllerUserData.login(email, pass);
    const check = status.status;
    if (check === "Calendar") {
      localStorage.set("apiToken", status.token);
      localStorage.set("email", email);
      window.location.replace("/calendar");
    } else if (check === "2fa") {
      localStorage.set("email", email);
      window.location.replace("/user-otp");
    } else if (check === "Eroare") {
      setEroare(status.message);
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

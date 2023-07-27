import React, { useState } from "react";
import { ControllerUserData } from "../../sdk/controllerUserData.sdk";
import localStorage from "local-storage";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [eroare, setEroare] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const status = await ControllerUserData.forgotPassword(email);

    const check = status.status;
    if (check) {
      localStorage.set("email", email);
      window.location.replace("/reset-code");
    } else {
      setEroare(status.message);
    }
  };

  return (
    <div className="formulare">
      <div className="auth-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <p>{eroare ? eroare : ""}</p>

          <h3 className="SpatiereRegister">Introduceți mail-ul </h3>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="nume@stud.etti.upb.ro"
            id="email"
            name="email"
          />

          <button type="submit" className="button-form">
            Verifică-mă!
          </button>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;

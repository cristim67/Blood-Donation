import React, { useState } from "react";
import { ControllerUserData } from "../../sdk/controllerUserData.sdk";
import localStorage from "local-storage";

export const PasswordChange = () => {
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [eroare, setEroare] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.get("email");
    const token = localStorage.get("apiToken");

    const status = await ControllerUserData.changePassword(
      email,
      password,
      confirmedPassword,
      token,
    );

    const check = status.status;
    if (check) {
      window.location.replace("/");
    } else {
      setEroare(status.message);
    }
  };

  return (
    <div className="formulare">
      <div className="auth-form-container SpatiereRegister">
        <h2 className="SpatiereRegister">Introdu noua parola</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <p>{eroare ? eroare : ""}</p>

          <label htmlFor="password">Parola</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            required
          />
          <label htmlFor="password">Confirmare Parola</label>
          <input
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="cpassword"
            name="cpassword"
            required
          />

          <button type="submit" className="button-form">
            Resetează
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;

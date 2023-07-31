import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ControllerUserData } from "../../sdk/controllerUserData.sdk";
import localStorage from "local-storage";

export const ResetCode = () => {
  const [code, setCode] = useState("");
  const [eroare, setEroare] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = await ControllerUserData.resetCode(
      localStorage.get("email"),
      code,
    );
    const check = status.status;
    if (check) {
      localStorage.set("apiToken", status.token);
      window.location.replace("/password-change");
    } else {
      setEroare(status.message);
    }
  };

  return (
    <div className="formulare">
      <div className="auth-form-container SpatiereRegister">
        <h2 className="SpatiereRegister">
          Introdu codul de resetare - {localStorage.get("email")}
        </h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <p>{eroare ? eroare : ""}</p>

          <label htmlFor="name">Code</label>
          <input
            value={code}
            name="code"
            onChange={(e) => setCode(e.target.value)}
            id="code"
            placeholder="code"
            required
          />
          <button type="submit" className="button-form">
            Verificare
          </button>
        </form>
        <Link to="/">
          <button className="link-btn">
            Vrei sa te verifici mai tarziu? Apasa aici
          </button>
        </Link>
      </div>
    </div>
  );
};
export default ResetCode;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ControllerUserData } from "../../sdk/controllerUserData.sdk";
import localStorage from "local-storage";

export const UserOtp = () => {
  const [code, setCode] = useState("");
  const [eroare, setEroare] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Status = await ControllerUserData.verificareOTP(
      code,
      localStorage.get("email"),
    );
    const status = Status.status;
    if (status) {
      localStorage.set("apiToken", Status.token);
      window.location.replace("/calendar");
    } else {
      setEroare(Status.message);
    }
  };

  return (
    <div className="formulare">
      <div className="auth-form-container SpatiereRegister">
        <h2 className="SpatiereRegister">
          Verificare Email - {localStorage.get("email")}
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
export default UserOtp;

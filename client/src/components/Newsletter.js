import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ControllerUserData } from "../sdk/controllerUserData.sdk";
export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && email.indexOf("@") > -1) {
      const status = await ControllerUserData.addNewsletter(email);
      if (status.status) clearFields();
      else window.location.replace("/");
    }
  };

  const clearFields = () => {
    setEmail("");
  };

  return (
    <Col lg={12}>
      <div className="newsletter-bx wow slideInUp">
        <Row>
          <Col lg={12} md={6} xl={5}>
            <h1>Rămâi la curent!</h1>
          </Col>
          <Col md={6} xl={7}>
            <form onSubmit={handleSubmit}>
              <div className="new-email-bx">
                <input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Adresa de email"
                />
                <button type="submit">Abonează-te</button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

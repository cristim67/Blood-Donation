import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/nume-doctor.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { ControllerUserData } from "../sdk/controllerUserData.sdk";

export const Contact = () => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000); // 5 seconds, you can adjust the duration as needed
  };

  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Trimite");

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Trimite...");
    const status = await ControllerUserData.sendMessage(
      formDetails.firstName,
      formDetails.lastName,
      formDetails.email,
      formDetails.phone,
      formDetails.message,
    );
    if (status.status) {
      showNotification(status.message);
      setButtonText("Send");
      setFormDetails(formInitialDetails);
    }
  };

  return (
    <section className="contact" id="contact">
      {notification && <div className="notification">{notification}</div>}
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                  src={contactImg}
                  alt="Contact Us"
                />
              )}
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Contactează-ne</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.firstName}
                          placeholder="Nume"
                          onChange={(e) =>
                            onFormUpdate("firstName", e.target.value)
                          }
                          required={true}
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.lastName}
                          placeholder="Prenume"
                          onChange={(e) =>
                            onFormUpdate("lastName", e.target.value)
                          }
                          required={true}
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="email"
                          value={formDetails.email}
                          placeholder="Adresă de email"
                          onChange={(e) =>
                            onFormUpdate("email", e.target.value)
                          }
                          required={true}
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="tel"
                          value={formDetails.phone}
                          placeholder="Număr de telefon"
                          onChange={(e) =>
                            onFormUpdate("phone", e.target.value)
                          }
                          required={true}
                        />
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea
                          rows="6"
                          value={formDetails.message}
                          placeholder="Mesaj"
                          onChange={(e) =>
                            onFormUpdate("message", e.target.value)
                          }
                          required={true}
                        ></textarea>
                        <button type="submit">
                          <span>{buttonText}</span>
                        </button>
                      </Col>
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

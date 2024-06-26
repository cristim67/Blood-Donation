import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import navIcon4 from "../assets/img/nav-icon4.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6}>
            <img src={logo} className="marginfooter" alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon marginfooter">
              <a
                href="https://www.facebook.com/lseorgro"
                target="_blank"
                rel="noreferrer"
              >
                <img src={navIcon2} alt="Icon" />
              </a>
              <a
                href="https://www.instagram.com/ligastudentilorelectronistilse/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={navIcon3} alt="Icon" />
              </a>
              <a
                href="https://www.tiktok.com/@lsebucuresti.ro"
                target="_blank"
                rel="noreferrer"
              >
                <img src={navIcon4} alt="Icon" />
              </a>
            </div>
            <p>Departamentul IT © 2023</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

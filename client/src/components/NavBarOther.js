import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
export const NavBarOther = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const isLoggedIn = localStorage.getItem("email");

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="/"
              style={{ color: "black" }}
              className={
                activeLink === "acasa" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("acasa")}
            >
              Acasa
            </Nav.Link>
          </Nav>
          {isLoggedIn && ( // Verifică dacă utilizatorul este conectat
            <Nav.Link href="/logout" className="navbar-link">
              <span className="navbar-text">
                <button className="vvd">
                  <span>Logout</span>
                </button>
              </span>
            </Nav.Link>
          )}
          {isLoggedIn && ( // Verifică dacă utilizatorul este conectat
            <Nav.Link href="/calendar">
              <span className="navbar-text">
                <button className="vvd">
                  <span>Programează-te</span>
                </button>
              </span>
            </Nav.Link>
          )}
          {!isLoggedIn && (
            <Nav.Link href="/login">
              <span className="navbar-text">
                <button className="vvd">
                  <span>Programează-te</span>
                </button>
              </span>
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

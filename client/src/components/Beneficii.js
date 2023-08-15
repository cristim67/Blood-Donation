import { Row, Col } from "react-bootstrap";
import "animate.css";

export const Beneficii = () => {
  return (
    <div className="project" id="beneficii">
      <Row className="tabel">
        <Col className="coloana">
          <h1 className="rembot3 color-black">Beneficii</h1>
          <ol className="gradient-list">
            <li className="color-black">
              Fiecare donator primește un card de bonuri de masă în valoare de
              70 de lei.
            </li>
            <li className="color-black">
              Anazile pentru identificarea virusurilor.
            </li>
            <li className="color-black">
              Carnet de donator ce iți aduce diverse avantaje.
            </li>
            <li className="color-black">
              O zi libera de la locul de munca in ziua donării.
            </li>
          </ol>
        </Col>
        <Col className="coloana">
          <h1 className="rembot3 color-black">Recomandari</h1>
          <ol class="gradient-list">
            <li className="color-black">
              Este recomandat să aveți 8 ore de somn.
            </li>
            <li className="color-black">
              Este recomandat să consumați o mancare ușoară și să vă hidratați
              înainte de donare.
            </li>
            <li className="color-black">
              Este recomandat cât mai puțin efort fizic înaintea donării.
            </li>
          </ol>
        </Col>
      </Row>
    </div>
  );
};

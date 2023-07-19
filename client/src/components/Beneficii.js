import {Row, Col,} from "react-bootstrap";
import 'animate.css';

export const Beneficii = () => {
    return (
        <div className="project" id="beneficii">
            <Row className="tabel">
                <Col className="coloana">
                    <h1 className="rembot3 color-black">Beneficii</h1>
                    <ol class="gradient-list">
                        <li className="color-black">Fiecare donator primeste un card de bonuri de
                            masa in valoare de 70 de lei.
                        </li>
                        <li className="color-black">Anazile pentru identificarea virusurilor.</li>
                        <li className="color-black">Carnet de donator ce iti aduce diverse avantaje.</li>
                        <li className="color-black">O zi libera de la locul de munca in ziua donarii.</li>
                    </ol>
                </Col>
                <Col className="coloana">
                    <h1 className="rembot3 color-black">Recomandari</h1>
                    <ol class="gradient-list">
                        <li className="color-black">Este recomandat sa aveti 8 ore de somn.</li>
                        <li className="color-black">Este recomandat sa consumati o mancare usoara si sa va hidratati
                            inainte de donare.
                        </li>
                        <li className="color-black">Este recomandat cat mai putin efort fizic inaintea donarii.</li>
                    </ol>
                </Col>

            </Row>
        </div>
    );
}



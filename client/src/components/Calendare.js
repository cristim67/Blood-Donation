import {Container, Row, Col, Tab, Nav} from "react-bootstrap";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import {RenderCalendar} from "./RenderCalendar";

export const Calendare = () => {


    return (
        <section className="project calendare" id="project">
            <Container>
                <Row>
                    <Col size={12}>
                        <TrackVisibility>
                            {({isVisible}) =>
                                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                    <h2 className="titlu-calendar">Calendar</h2>
                                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                                        <Nav variant="pills"
                                             className="nav-pills mb-5 justify-content-center align-items-center"
                                             id="pills-tab">
                                            <Nav.Item>
                                                <Nav.Link eventKey="first">Ziua 1</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="second">Ziua 2</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="third">Ziua 3</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content id="slideInUp"
                                                     className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                                            <Tab.Pane eventKey="first">
                                                <Row>
                                                    <RenderCalendar/>
                                                </Row>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                <RenderCalendar/>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="third">
                                                <RenderCalendar/>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
            <img className="background-image-right" src={colorSharp2}></img>
        </section>
    )
}

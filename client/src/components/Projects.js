import { Container, Row, Col, Tab } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.svg";
import projImg2 from "../assets/img/project-img2.svg";
import projImg3 from "../assets/img/project-img3.svg";
import projImg4 from "../assets/img/project-img4.svg";
import projImg5 from "../assets/img/project-img5.svg";
import projImg6 from "../assets/img/project-img6.svg";
import colorSharp2 from "../assets/img/color-sharp2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Projects = () => {
  const projects = [
    {
      title: "Consumul de alcool",
      description: "Nu se consuma alcool cu 24 de ore inainte de a dona",
      imgUrl: projImg1,
    },
    {
      title: "Greutate",
      description: "Greutatea minima ceruta este de 50 de kg",
      imgUrl: projImg2,
    },
    {
      title: "Fumat",
      description: "Nu fumati in ziua donarii",
      imgUrl: projImg3,
    },
    {
      title: "Interventii chirurgicale",
      description:
        "Sa nu aveti interventii chirurgicale in ultimele 3 saptamani ( regula se aplica si in cazul persoanelor care urmeaza tratament medical)",
      imgUrl: projImg4,
    },
    {
      title: "Tatuaj/Piercing",
      description:
        "Nu se poate dona daca ai facut un tatuaj/piercing in ultimele 6 luni",
      imgUrl: projImg5,
    },
    {
      title: "Simptome",
      description:
        "Sa nu aveti simptome de raceala sau sa nu fiti vaccinati cu 48 de ore inainte de a dona",
      imgUrl: projImg6,
    },
  ];

  return (
    <section className="project" id="reguli">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2 className="margin2rem">Informații și restricții</h2>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible ? "animate__animated animate__slideInUp" : ""
                      }
                    >
                      <Tab.Pane eventKey="first">
                        <Row>
                          {projects.map((project, index) => {
                            return <ProjectCard key={index} {...project} />;
                          })}
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  );
};

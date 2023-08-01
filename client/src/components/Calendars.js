import React, { useState, useEffect } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import colorSharp2 from "../assets/img/color-sharp2.png";
import { RenderCalendar } from "./RenderCalendar";
import { ControllerUserData } from "../sdk/controllerUserData.sdk";

export const Calendars = () => {
  const [eventsDate, setEventsDate] = useState({});
  const [activeTab, setActiveTab] = useState("first");

  const updateEventsDate = (dayCalendar, newEvents) => {
    setEventsDate((prevEvents) => ({
      ...prevEvents,
      [dayCalendar]: newEvents,
    }));
  };

  const fetchEventsData = async () => {
    try {
      const eventsFirst = await fetchEventsForDay("first");
      const eventsSecond = await fetchEventsForDay("second");
      const eventsThird = await fetchEventsForDay("third");

      setEventsDate({
        first: eventsFirst,
        second: eventsSecond,
        third: eventsThird,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEventsData();
  }, []);

  const fetchEventsForDay = async (day) => {
    try {
      const events = await ControllerUserData.getEventsCalendar(
        localStorage.getItem("apiToken"),
        day,
      );
      return events;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
  };

  return (
    <section className="project calendare" id="project">
      <Container>
        <Row>
          <Col size={12}>
            <div>
              <h2 className="titlu-calendar">Calendar</h2>
              <Tab.Container
                id="projects-tabs"
                activeKey={activeTab}
                onSelect={handleTabChange}
              >
                <Nav
                  variant="pills"
                  className="nav-pills mb-5 justify-content-center align-items-center"
                  id="pills-tab"
                >
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
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Row>
                      <RenderCalendar
                        dayCalendar={"first"}
                        key={Math.random()}
                        eventsDate={eventsDate}
                        updateEventsDate={updateEventsDate}
                      />
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <RenderCalendar
                      dayCalendar={"second"}
                      key={Math.random()}
                      eventsDate={eventsDate}
                      updateEventsDate={updateEventsDate}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <RenderCalendar
                      dayCalendar={"third"}
                      key={Math.random()}
                      eventsDate={eventsDate}
                      updateEventsDate={updateEventsDate}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </Col>
        </Row>
      </Container>
      <img
        className="background-image-right"
        src={colorSharp2}
        alt="background-image-right"
      />
    </section>
  );
};

export default Calendars;

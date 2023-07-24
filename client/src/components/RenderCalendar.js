import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ControllerUserData } from "../sdk/controllerUserData.sdk";

export class RenderCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsDate: undefined,
    };
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  async componentDidMount() {
    try {
      const events = await ControllerUserData.getEventsCalendar();
      this.setState({ eventsDate: events });
    } catch (error) {
      console.log(error);
    }
  }

  async handleDateClick(arg) {
    const email = localStorage.getItem("email");
    const startDate = arg.startStr;
    const endDate = arg.endStr;
    const calendar = 1;
    const status = await ControllerUserData.addPersonCalendar(
      email,
      startDate,
      endDate,
      calendar,
    );

    if (status.status) {
      window.location.reload();
    } else {
      // setError(Status.mesaj);
      console.log(Status.message);
    }
  }

  async handleEventClick(arg) {
    try {
      if (
        localStorage
          .getItem("email")
          .slice(1, localStorage.getItem("email").length - 1) ===
        arg.event.title
      ) {
        const deleteEvents = await ControllerUserData.deletePerson(
          arg.event.title,
        );

        if (deleteEvents.status) {
          window.location.reload();
        } else {
          // setError(deleteEvents.mesaj);
          console.log(deleteEvents.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="calendar">
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
          initialView="timeGridDay"
          slotDuration="00:15:00"
          validRange={{ start: "2023-11-01", end: "2023-11-02" }}
          slotMinTime="08:30:00"
          slotMaxTime="12:30:00"
          allDaySlot={false}
          height="auto"
          selectable={true}
          select={this.handleDateClick}
          headerToolbar={{
            right: "",
            center: "",
          }}
          eventDisplay="block"
          dayHeaders={false}
          weekends={false}
          // events={[
          //   { title: "event 1", start: "2023-11-01T08:00:00.000Z", end:"2023-11-01T08:15:00.000Z"},
          // ]}
          // events={[{title: 'miloiuc4@gmail.com', start: '2023-11-01T08:00:00.000Z', end: '2023-11-01T08:15:00.000Z'}]}
          events={this.state.eventsDate}
          eventClick={this.handleEventClick}
        />
      </div>
    );
  }
}

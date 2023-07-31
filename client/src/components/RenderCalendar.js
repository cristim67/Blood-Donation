import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ControllerUserData } from "../sdk/controllerUserData.sdk";
import localStorage from "local-storage";

export class RenderCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  componentDidMount() {
    this.fetchEventsData();
  }

  async fetchEventsData() {
    try {
      const events = await ControllerUserData.getEventsCalendar(
        localStorage.get("apiToken"),
        this.props.dayCalendar,
      );
      this.props.updateEventsDate(this.props.dayCalendar, events);
    } catch (error) {
      console.log(error);
    }
  }

  async handleDateClick(arg) {
    const token = localStorage.get("apiToken");
    const email = localStorage.get("email");
    const startDate = arg.startStr;
    const endDate = arg.endStr;
    const calendar = this.props.dayCalendar;
    const status = await ControllerUserData.addPersonCalendar(
      token,
      email,
      startDate,
      endDate,
      calendar,
    );

    if (status.status) {
      window.location.reload();
    } else {
      // setError(Status.mesaj);
      console.log(status.message);
    }
  }

  async handleEventClick(arg) {
    try {
      if (localStorage.get("email") === arg.event.title) {
        const deleteEvents = await ControllerUserData.deletePerson(
          localStorage.get("apiToken"),
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
          events={this.props.eventsDate}
          eventClick={this.handleEventClick}
        />
      </div>
    );
  }
}

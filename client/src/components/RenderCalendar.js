import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ControllerUserData } from "../sdk/controllerUserData.sdk";
import localStorage from "local-storage";
export const RenderCalendar = ({
  dayCalendar,
  updateEventsDate,
  eventsDate,
}) => {
  const handleDateClick = async (arg) => {
    const token = localStorage.get("apiToken");
    const email = localStorage.get("email");
    const startDate = arg.startStr;
    const endDate = arg.endStr;
    const calendar = dayCalendar;
    const status = await ControllerUserData.addPersonCalendar(
      token,
      email,
      startDate,
      endDate,
      calendar,
    );

    if (status.status) {
      updateEventsDate(dayCalendar, status.events);
      window.location.reload();
    } else {
      // setError(Status.mesaj);
      console.log(status.message);
    }
  };

  const handleEventClick = async (arg) => {
    try {
      if (localStorage.get("email") === arg.event.title) {
        const deleteEvents = await ControllerUserData.deletePerson(
          localStorage.get("apiToken"),
          arg.event.title,
        );

        if (deleteEvents.status) {
          updateEventsDate(dayCalendar, deleteEvents.events);
          window.location.reload();
        } else {
          // setError(deleteEvents.mesaj);
          console.log(deleteEvents.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const eventsForDay = eventsDate && eventsDate[dayCalendar];

  if (!eventsForDay) {
    return null;
  }

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
        select={handleDateClick}
        headerToolbar={{
          right: "",
          center: "",
        }}
        eventDisplay="block"
        dayHeaders={false}
        weekends={false}
        events={eventsForDay}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default RenderCalendar;

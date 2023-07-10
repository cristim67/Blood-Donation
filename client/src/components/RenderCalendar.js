import React, { useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

export const RenderCalendar = () => {
  useEffect(() => {
    const calendarEl = document.getElementById('calendar');

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin],
      // Configurația calendarului
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, []);

  return <div id="calendar" />;
};



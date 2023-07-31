import { NavBarOther } from "../../components/NavBarOther";
import { Calendars } from "../../components/Calendars";
import { ControllerUserData } from "../../sdk/controllerUserData.sdk";
import React from "react";
const Calendar = () => {
  React.useEffect(() => {
    const checkSession = async () => {
      const status = await ControllerUserData.checkSession(
        localStorage.getItem("apiToken"),
      );

      if (!status.status) window.location.replace("/");
    };
    checkSession();
  }, []);

  return (
    <div className="App">
      <NavBarOther />
      <Calendars />
    </div>
  );
};

export default Calendar;

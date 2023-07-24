import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ControllerUserData } from "../../sdk/controllerUserData.sdk";
import localStorage from "local-storage";

const Logout = (props) => {
  localStorage.clear();
  window.location.replace("/");
};
export default Logout;

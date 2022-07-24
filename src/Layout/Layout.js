import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Calendar from "../Schedule/Calendar";
import ClientNumber from "../Schedule/ClientNumber";
import DateTimePicker from "../Schedule/DateTimePicker";

function Layout() {
  return (
    <Routes>
      <Route exact={true} path="/" element={<Home />} />
      <Route exact={true} path="/schedule" element={<ClientNumber />} />
      <Route
        exact={true}
        path="/schedule/date-selection"
        element={<DateTimePicker />}
      />
    </Routes>
  );
}

export default Layout;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Calendar from "../Schedule/Calendar";
import ClientNumber from "../Schedule/ClientNumber";
import DateTimePicker from "../Schedule/DateTimePicker";
import "./Layout.css"
function Layout() {
  return (
    <div className="mainContainer">
      <Header/>
    <main className="col-lg-9">
      <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route exact={true} path="/schedule" element={<ClientNumber />} />
        <Route
          exact={true}
          path="/schedule/date-selection"
          element={<DateTimePicker />}
          />
      </Routes>
    </main>
    </div>
  );
}

export default Layout;

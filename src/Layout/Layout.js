import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import Schedule from '../components/Appointments/Schedule/Schedule'
import "./Layout.css";
function Layout() {

  return (
    <div className="mainContainer">
      <Header />
      <main className="col-lg-9">
        <div className="mainScreen">
          <div className="blur">
            <Routes>
              <Route exact={true} path="/" element={<Home />} />
              <Route exact={true} path="/appointments/schedule" element={<Schedule />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;

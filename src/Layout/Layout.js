import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Calendar from '../Schedule/Calendar';
import Schedule from '../Schedule/ScheduleAppt';

function Layout() {
  return (
    <Routes>
      <Route exact={true} path="/" element={<Home />} />
      <Route exact={true} path="/schedule" element={<Schedule />} />
      <Route
        exact={true}
        path="/schedule/date-selection"
        element={<Calendar />}
      />
    </Routes>
  );
}

export default Layout;

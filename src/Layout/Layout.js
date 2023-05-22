import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import ClientNumber from "../components/Schedule/ClientNumber";
import Schedule from "../components/Schedule/Schedule";
import "./Layout.css";
function Layout() {
  const [clientNumber, setClientNumber] = useState(1);
  const [formData, setFormData] = useState({ numOfClients: 1 });
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setClientNumber(formData.numOfClients);
    navigate(`/schedule/${clientNumber}/date-selection`);
  };
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.id]: target.value,
    });
  };
  return (
    <div className="mainContainer">
      <Header />
      <main className="col-lg-9">
        <div className="mainScreen">
          <div className="blur">
            <Routes>
              <Route exact={true} path="/" element={<Home />} />
              <Route exact={true} path={`/schedule`} element={<Schedule />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;

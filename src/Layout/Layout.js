import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Home from "../Home/Home";
import ClientNumber from "../Schedule/ClientNumber";
import DateTimePicker from "../Schedule/DateTimePicker";
import "./Layout.css";
function Layout() {
  const [clientNumber, setClientNumber] = useState(1);
  const [formData, setFormData] = useState({ numOfClients: 1 });
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setClientNumber(formData.numOfClients);
    navigate("/schedule/date-selection");
  };
  const handleChange = ({target}) =>{
    setFormData({
         ...formData, 
         [target.id]: target.value
    })
}
  return (
    <div className="mainContainer">
      <Header />
      <main className="col-lg-9">
        <Routes>
          <Route exact={true} path="/" element={<Home />} />
          <Route exact={true} path="/schedule" element={<ClientNumber formData={formData} handleSubmit={handleSubmit} handleChange={handleChange}/>} />
          <Route
            exact={true}
            path={`/schedule/${clientNumber}/date-selection`}
            element={<DateTimePicker />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default Layout;

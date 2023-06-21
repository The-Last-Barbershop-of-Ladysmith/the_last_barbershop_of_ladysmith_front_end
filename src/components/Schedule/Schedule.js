import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import "./Schedule.css";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import ClientInfo from "./ClientInfo";
import Review from "./Review";
import { createAppointment } from './Schedule.service'

const DateTimePicker = () => {
  const clientNumRef = useRef(null);
  const dateRef = useRef(null);
  const reviewRef = useRef(null);
  const [stepCounter, setStepCounter] = useState(0);
  const [dateSelected, setDateSelected] = useState(new Date());
  const [hoursActive, setHoursActive] = useState(false);
  const month = dateSelected.getMonth();
  const [formData, setFormData] = useState({
    people: 1,
    appointment_date: new Date(),
    appointment_time: "",
    mobile_number: "___-___-_____",
    first_name: "",
    last_name: "",
  });

  const navigate = useNavigate()

  const handleFormChange = ({ target }) => {
    console.log(target, typeof target.value)
    setFormData({
      ...formData,
      [target.name]: target.value || target.dataset.timeValue,
    });
    if (target.name === "appointment_date") {
      setHoursActive(true)
    }
  };

  const handleNext = (event) => {
    event.preventDefault();
    const stepRefs = [clientNumRef, dateRef, reviewRef];
    stepRefs[stepCounter].current.dataset.tabActive = true;
    setStepCounter((prev) => prev + 1);
    const nextStep = stepRefs[stepCounter + 1];
    nextStep.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const appointment = await createAppointment(formData)
    if (appointment) navigate('/')
  }

  const formButton =
    stepCounter === 2 ? (
      <button
        type="Submit"
        className="btn btn-secondary m-2"
        onClick={handleSubmit}
      >
        Submit
      </button>
    ) : (
      <button
        type="button"
        className="btn btn-secondary m-2"
        onClick={handleNext}
      >
        Next
      </button>
    );

    const formatApptDate = (date) =>{
      const options = {year: 'numeric', month: '2-digit', day: '2-digit' }
      const [month, day, year] =  date.toLocaleDateString('en-US', options).split('/')
      return `${year}-${month}-${day}`
    }

  const handleMonthNextClick = (e) => {
    e.preventDefault();
    setHoursActive(false);
    const d = new Date();
    d.setMonth(month + 1);
    d.setDate(1);
    setDateSelected(d);
  };
  const handleMonthPrevClick = (e) => {
    e.preventDefault();
    setHoursActive(false);
    const d = new Date();
    d.setMonth(month - 1);
    d.setDate(1);
    setDateSelected(d);
  };
  const handleMonthSelect = () => {
    setHoursActive(false);
    setDateSelected(new Date());
  };

  return (
    <div className="scheduleCard card davysGrey">
      <ul className="nav nav-tabs progressbar" id="myTab" role="tablist">
        <li
          className="nav-link active"
          id="client-info-tab"
          data-bs-toggle="tab"
          data-bs-target="#client-info"
          data-tab-active="false"
          type="button"
          role="tab"
          aria-controls="client-info"
          aria-selected="true"
          ref={clientNumRef}
          onClick={(e) => setStepCounter(0)}
        >
          <h2>Your Info</h2>
        </li>
        <li
          className="nav-link"
          id="Date-Time-tab"
          data-bs-toggle="tab"
          data-bs-target="#Date-Time"
          data-tab-active="false"
          type="button"
          role="tab"
          aria-controls="Date-Time"
          aria-selected="false"
          ref={dateRef}
          onClick={() => setStepCounter(1)}
        >
          <h2>Date & Time</h2>
        </li>
        <li
          className="nav-link"
          id="review-tab"
          data-bs-toggle="tab"
          data-bs-target="#review"
          data-tab-active="false"
          type="button"
          role="tab"
          aria-controls="review"
          aria-selected="false"
          ref={reviewRef}
          onClick={() => setStepCounter(2)}
        >
          <h2>Review</h2>
        </li>
      </ul>

      <form className="tab-content card-body p-0" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="client-info"
          role="tabpanel"
          aria-labelledby="client-info-tab"
        >
          <ClientInfo formData={formData} handleChange={handleFormChange} />
        </div>
        <div
          className="tab-pane fade"
          id="Date-Time"
          role="tabpanel"
          aria-labelledby="Date-Time-tab"
        >
          <DatePicker
            formData={formData}
            handleDecrease={handleMonthPrevClick}
            handleIncrease={handleMonthNextClick}
            handleMonthSelect={handleMonthSelect}
            handleChange={handleFormChange}
          />
          {hoursActive && <TimePicker dateSelected={dateSelected} handleTimeSelect={handleFormChange} />}
        </div>
        <div
          className="tab-pane fade"
          id="review"
          role="tabpanel"
          aria-labelledby="review-tab"
        >
        <Review formData={formData} />
        </div>
      </form>
      <div className="form-footer">
      <button type="button" className="btn btn-secondary m-2 w-5">Cancel</button>
      {formButton}
      </div>
    </div>
  );
};

export default DateTimePicker;

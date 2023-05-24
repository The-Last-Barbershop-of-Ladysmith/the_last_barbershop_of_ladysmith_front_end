import React, { useState, useRef } from "react";
import "./Schedule.css";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import ClientInfo from "./ClientInfo";

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
    appointment_date: "",
    appointment_time: "",
  });

  const handleFormChange = ({ target }) => {
    console.log(target.dataset, "i was changed")
    setFormData({
      ...formData,
      [target.id]: target.value || target.dataset.timeValue,
    });
    console.log(formData)
  };

  const handleNext = (event) => {
    event.preventDefault();
    const stepRefs = [clientNumRef, dateRef, reviewRef];
    stepRefs[stepCounter].current.dataset.tabActive = true;
    setStepCounter((prev) => prev + 1);
    const nextStep = stepRefs[stepCounter + 1];
    nextStep.current.click();
  };

  const formButton =
    stepCounter === 2 ? (
      <button
        type="Submit"
        className="btn btn-secondary m-2"
        onClick={handleNext}
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
  const handleDayClick = (day) => {
    setHoursActive(true);
    const d = new Date();
    d.setMonth(month);
    d.setDate(day);
    setDateSelected(d);
    const appointment_date = formatApptDate(d)
    setFormData({...formData, appointment_date })
    console.log(appointment_date, formData)
  };

  return (
    <div className="scheduleCard card davysGrey">
      <ul class="nav nav-tabs progressbar" id="myTab" role="tablist">
        <li
          class="nav-link active"
          id="people-tab"
          data-bs-toggle="tab"
          data-bs-target="#people"
          data-tab-active="false"
          type="button"
          role="tab"
          aria-controls="people"
          aria-selected="true"
          ref={clientNumRef}
          onClick={(e) => setStepCounter(0)}
        >
          <h2>Number Of People</h2>
        </li>
        <li
          class="nav-link"
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
          <h2>Date & Time Selection</h2>
        </li>
        <li
          class="nav-link"
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
          class="tab-pane fade show active"
          id="people"
          role="tabpanel"
          aria-labelledby="people-tab"
        >
          <ClientInfo formData={formData} handleChange={handleFormChange} />
        </div>
        <div
          class="tab-pane fade"
          id="Date-Time"
          role="tabpanel"
          aria-labelledby="Date-Time-tab"
        >
          <DatePicker
            viewDate={dateSelected}
            handleDecrease={handleMonthPrevClick}
            handleIncrease={handleMonthNextClick}
            handleMonthSelect={handleMonthSelect}
            handleDayClick={handleDayClick}
            month={month}
          />
          {hoursActive && <TimePicker dateSelected={dateSelected} handleTimeSelect={handleFormChange}/>}
        </div>
        <div
          class="tab-pane fade"
          id="review"
          role="tabpanel"
          aria-labelledby="review-tab"
        ></div>
      </form>
      {formButton}
    </div>
  );
};

export default DateTimePicker;

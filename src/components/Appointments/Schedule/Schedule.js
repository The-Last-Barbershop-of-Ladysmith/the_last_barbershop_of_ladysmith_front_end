import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Schedule.css";
import DatePicker from "./forms/DatePicker";
import TimePicker from "./forms/TimePicker";
import ClientInfo from "./forms/ClientInfo";
import Review from "./Review";
import { createAppointment } from "./Schedule.service";
import {
  getInvalidDateTimeFields,
  getInvalidInfoFormFields,
} from "./ScheduleFormValidation";
import AppAlert from "../../AppAlert/AppAlert";

const DateTimePicker = () => {
  const clientNumRef = useRef(null);
  const dateRef = useRef(null);
  const reviewRef = useRef(null);
  const [formErrorAlert, setFormErrorAlert] = useState();
  const [stepCounter, setStepCounter] = useState(0);
  const [errorFields, setErrorFields] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [formData, setFormData] = useState({
    people: 1,
    appointment_date: new Date(),
    appointment_time: "",
    appointment_end: "",
    mobile_number: "",
    first_name: "",
    last_name: "",
  });
  const formAlertRef = useCallback((alertNode)=>{
    setFormErrorAlert(alertNode)
  },[])
  const month = formData.appointment_date.getMonth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(formErrorAlert) formErrorAlert.focus()
  },[formErrorAlert])

  // Calculate endtime to be 30 min after appointment's start time
  const getAppointmentEndTime = ({people, appointment_date}) => {
    const minutesNeeded = (people * 30) - 1
    return new Date(appointment_date.getTime() + minutesNeeded * 60000)
      .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  useEffect(()=>{
    if(formData.appointment_time.length) setFormData({
      ...formData, 
      appointment_end: getAppointmentEndTime(formData)
    })
    console.log(formData, getAppointmentEndTime(formData))
  }, [formData.people, formData.appointment_time])

  const handleFormChange = ({ target }) => {
    if (target.name === "appointment_time") {
      const { appointment_date } = formData;
      const newDate = new Date(
        formatApptDate(appointment_date) + "T" + target.value
      );
      setFormData({
        ...formData,
        appointment_date: newDate,
        appointment_time: target.value,
      });
    } else if (target.name === "appointment_date") {
      setFormData({
        ...formData,
        appointment_date: new Date(target.value),
        appointment_time: ""
      });
    }else {
      //In case of autofil, mobile number will start with one.  Remove the first digit in this case
      if (target.name === 'mobile_number' && target.value.length === 11){
        target.value = [...target.value].shift().toString()
      }
      console.log(target.value)
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    }
  };

  const handleNext = (event) => {
    event.preventDefault();
    const stepRefs = [clientNumRef, dateRef, reviewRef];
    const getInvalidFieldsByTab = [
      getInvalidInfoFormFields,
      getInvalidDateTimeFields,
    ];
    const fieldsWithError = getInvalidFieldsByTab[stepCounter](formData);
    setErrorFields(fieldsWithError);
    if (!fieldsWithError.length) {
      stepRefs[stepCounter].current.dataset.tabActive = true;
      setStepCounter((prev) => prev + 1);
      const nextStep = stepRefs[stepCounter + 1];
      nextStep.current.click();
    } 
  };

  const handlePrev = (event) => {
    event.preventDefault();
    const stepRefs = [clientNumRef, dateRef, reviewRef];
    stepRefs[stepCounter - 1].current.dataset.tabActive = false;
    const nextStep = stepRefs[stepCounter - 1];
    setErrorFields([])
    setShowApiAlert(false)
    nextStep.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = formatApptDate(formData.appointment_date);
    const appointmentData = { ...formData, appointment_date: formattedDate };
    const appointment = await createAppointment(appointmentData, setApiError);
    setShowApiAlert(true)
    if (appointment) {
      navigate(`/appointments/${appointment.appointment_id}`)
    }
  };

  const formButton =
    stepCounter === 2 ? (
      <button type="submit" className="btn btn-primary align-self-right richBlack">
        Submit
      </button>
    ) : (
      <button type="button" className="btn btn-primary richBlack " onClick={handleNext}>
        Next 
      </button>
    );

  function formatApptDate(date) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const [month, day, year] = date
      .toLocaleDateString("en-US", options)
      .split("/");
    return `${year}-${month}-${day}`;
  }

  const isCurrentMonth = () => {
    const { appointment_date } = formData;
    const today = new Date();
    return (
      appointment_date.getMonth() === today.getMonth() &&
      appointment_date.getFullYear() === today.getFullYear
    );
  };

  const handleMonthNextClick = (e) => {
    e.preventDefault();
    formData.appointment_date.setMonth(month + 1);
    formData.appointment_date.setDate(1);
    setFormData({
      ...formData,
      appointment_time: "",
    });
  };
  
  const handleMonthPrevClick = (e) => {
    e.preventDefault();
    let {appointment_date} = formData
    appointment_date.setMonth(month - 1);
    isCurrentMonth? appointment_date = new Date(): appointment_date.setDate(1);
    setFormData({
      ...formData,
      appointment_time: "",
      appointment_date
    });
  };

  const handleMonthSelect = () => {
    setFormData({
      ...formData,
      appointment_date: new Date(),
      appointment_time: "",
    });
  };

  const disabledTab = {
    pointerEvents: "none", 
  };

  const dateSelectedLabel =  formData.appointment_date.toLocaleDateString('en-US',{
    month:'long',
    day: 'numeric',
  }) 

  const timeSelectedLabel =
    formData.appointment_time.length > 0
      ? `@ ${formData.appointment_date.toLocaleTimeString("en-US", {
          timeStyle: "short",
        })} `
      : "";

  return (
    <div className="scheduleCard card">
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary justify-self-end">
          <span className="material-symbols-outlined closeBtn">close</span>
        </button>
      </div>
      <ul className="nav nav-tabs progressbar" id="myTab" role="tablist">
        <div className="bgBar"></div>
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
          style={disabledTab}
          id="Date-Time-tab"
          data-bs-toggle="tab"
          data-bs-target="#Date-Time"
          data-tab-active="false"
          type="button"
          role="tab"
          aria-controls="Date-Time"
          aria-selected="false"
          ref={dateRef}
          onClick={(e) => {
            e.preventDefault();
            e.target.style = null;
            setStepCounter(1);
          }}
        >
          <h2>Date & Time</h2>
        </li>
        <li
          className="nav-link"
          id="review-tab"
          style={disabledTab}
          data-bs-toggle="tab"
          data-bs-target="#review"
          data-tab-active="false"
          type="button"
          role="tab"
          aria-controls="review"
          aria-selected="false"
          ref={reviewRef}
          onClick={(e) => {
            e.preventDefault();
            e.target.style = null;
            setStepCounter(2);
          }}
        >
          <h2>Review</h2>
        </li>
      </ul>

        {errorFields.length > 0 && 
          <AppAlert
            severity="danger"
            message=' Error(s) Found!'
            addClass='text-center'
            emphasize={errorFields.length}
            useRef={formAlertRef}
          /> 
        }

        {showApiAlert && 
          <AppAlert
            severity={apiError? 'danger': 'success'}
            title={apiError? 'Oops! Something Went Wrong.' :  'Success!'}
            message={apiError? 'Appointment unable to be scheduled at this time.  Please try again': 'Appointment Successfully scheduled'}
            dismissable={true}
            useRef={formAlertRef}
          />  
        }
        
      <form className="tab-content card-body p-0" id="myTabContent" onSubmit={handleSubmit}>
        <div
          className="tab-pane fade show active"
          id="client-info"
          role="tabpanel"
          aria-labelledby="client-info-tab"
        >
          <ClientInfo
            formData={formData}
            handleChange={handleFormChange}
            errorFields={errorFields}
          />
        </div>
        <div
          className="tab-pane fade"
          id="Date-Time"
          role="tabpanel"
          aria-labelledby="Date-Time-tab"
        >
          <strong className="selectedDateTime">
            <span>
              {dateSelectedLabel + " " + timeSelectedLabel}
            </span>
          </strong>
          <DatePicker
            formData={formData}
            handleDecrease={handleMonthPrevClick}
            handleIncrease={handleMonthNextClick}
            handleMonthSelect={handleMonthSelect}
            handleChange={handleFormChange}
          />
          <TimePicker
            dateSelected={formData.appointment_date}
            formatApptDate={formatApptDate}
            handleTimeSelect={handleFormChange}
            hasError={errorFields.includes('appointment_time')}
            endTime={formData.appointment_end}
          />
        </div>
        <div
          className="tab-pane fade"
          id="review"
          role="tabpanel"
          aria-labelledby="review-tab"
        >
          <Review formData={formData} formatApptDate={formatApptDate} />
        </div>
      <div className="form-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handlePrev}
          disabled={stepCounter===0}
        >
          Back
        </button>
        {formButton}
      </div>
      </form>
    </div>
  );
};

export default DateTimePicker;

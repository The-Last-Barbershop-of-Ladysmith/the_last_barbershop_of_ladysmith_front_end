import React from "react";
import './Review.css'

const Review = ({ formData, formatApptDate }) => {
  const {
    first_name,
    last_name,
    mobile_number,
    appointment_date,
    appointment_time,
    people,
    appointment_end
  } = formData;

  const apptDateObj = new Date(formatApptDate(appointment_date) + "T" + appointment_time);
  
  const formattedDate = apptDateObj.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const formattedtime = apptDateObj.toLocaleTimeString("en-US", {
    timeStyle: "short",
  });

  const formattedEndTime = new Date(formatApptDate(appointment_date) + "T" + appointment_end)
    .toLocaleTimeString("en-US",{})

  return (
    <div>
      <h3>
      <span className="material-symbols-outlined">preview</span>
      <span> Review Appointment Details</span>
      </h3>
      <ul className="formDetails">
        <li>
          <span>First Name: </span>
          <span>{first_name}</span>
        </li>
        <li>
          <span>Last Name: </span>
          <span>{last_name}</span>
        </li>
        <li>
          <span>Mobile Number: </span>
          <span>{mobile_number}</span>
        </li>
        <li>
          <span>Date: </span>
          <span>{formattedDate}</span>
        </li>
        <li>
          <span>Time: </span>
          <span>{`${formattedtime} - ${formattedEndTime}`}</span>
        </li>
        <li>
          <span>Number of People: </span>
          <span>{people}</span>
        </li>
      </ul>
    </div>
  );
};

export default Review;

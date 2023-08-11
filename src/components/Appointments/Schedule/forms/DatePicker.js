import React, { useEffect, useState } from "react";
import "./DatePicker.css"
import FormItem from "../../../Forms/FormItem";

const Calendar = ({
  formData, handleDecrease, handleIncrease, handleMonthSelect, handleChange
}) => {

  const {appointment_date} = formData

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 781px)").matches
  );
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const calendarWeekDates = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

  useEffect(() => {
    window
      .matchMedia("(min-width: 781px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const startDate = new Date(formData.appointment_date)
  startDate.setDate(1);
  const firstDay = startDate.getDay();
  const year = startDate.getFullYear();
  const monthEnd = new Date(year, startDate.getMonth() + 1, 0);
  // Gather table data with each calendar day for the month
  Object.keys(calendarWeekDates).forEach((weekNum) => {
    const week = calendarWeekDates[weekNum];
    const endOfWeek = weekNum * 7;
    // Loop through the week to get the day number
    for (let i = endOfWeek - 7; i < endOfWeek; i++) {
      const day = i - firstDay + 1;
      let tableData;
      // If the day number is less than zero or greather than the end of the month, retrun empty cell
      if (day < 1 || day > monthEnd.getDate()) {
        tableData = <td key={day}></td>;
      } else {
        const today = new Date()
        today.setHours(0,0,0,0)
        const cellDate = new Date(
          appointment_date.getFullYear(),
          appointment_date.getMonth(),
          day,
        ); 
        // else return cell with the day number
        tableData = (
          <td key={day} id='calendarDate'>
            <FormItem
              type="radio"
              id={day}
              altFormClass={appointment_date.getDate() === cellDate.getDate() ? 'dateLabel selectedDate': 'dateLabel'}
              name="appointment_date"
              value={cellDate}
              onChange={handleChange}
              otherInputOptions={{disabled: cellDate < today }}
              label={day}
            />
          </td>
        );
      }
      week.push(tableData);
    }
    calendarWeekDates[weekNum] = week;
  });

  const tableHeadings = weekdays.map((day) => {
    const label = matches ? day.slice(0,3) : day[0];
    return <th key={day}>{label}</th>;
  });

  return (
    <fieldset className="card calendarCard text-center col-lg-8">
      <legend className="card-header">
        <span className="material-symbols-outlined">today</span>
        <span> Select Date</span>
      </legend>
      <div className="card-body">
        <div className="card-title container">
          <div className="row">
            <div className="col-3">
              <button
                className="btn"
                onClick={handleDecrease}
                disabled={
                  formData.appointment_date.getMonth() <= new Date().getMonth() 
                  && formData.appointment_date.getFullYear() <= new Date().getFullYear()
                }
              >{`<`}</button>
            </div>
            <div className="col-6">
              <h4 onClick={handleMonthSelect}>
                {monthNames[new Date(formData.appointment_date).getMonth()]}
              </h4>
            </div>
            <div className="col-3">
              <button className="btn" onClick={handleIncrease}>{`>`}</button>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>{tableHeadings}</tr>
          </thead>
          <tbody>
            {Object.values(calendarWeekDates).map((week, i) => (
              <tr key={i}>{week}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </fieldset>
  );
};
export default Calendar;

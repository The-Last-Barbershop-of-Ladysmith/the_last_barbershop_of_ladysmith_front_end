import React, { useEffect, useState } from "react";

const Calendar = ({
  viewDate,
  handleDecrease,
  handleIncrease,
  handleMonthSelect,
  handleDayClick,
  month,
}) => {
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
  document.body.style = "background: white; color: black";

  const calendarWeekDates = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

  useEffect(() => {
    window
      .matchMedia("(min-width: 781px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  viewDate.setDate(1);
  const firstDay = viewDate.getDay();
  const year = viewDate.getFullYear();
  const monthEnd = new Date(year, month + 1, 0);

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
        // else return cell with the day number
        tableData = (
          <td key={day}>
            <div
              onClick={() => handleDayClick(day)}
              className=" btn calendarDate"
            >
              {day}
            </div>
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
    <div className="card calendarCard text-center col-lg-8">
      <h3 className="card-header">
        <span className="material-symbols-outlined">today</span>
        <span>  Select Date</span>
      </h3>
      <div className="card-body">
        <div className="card-title container">
          <div className="row">
            <div className="col-3">
              <button className="btn" onClick={handleDecrease}>{`<`}</button>
            </div>
            <div className="col-6">
              <h4 onClick={handleMonthSelect}>{monthNames[month]}</h4>
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
    </div>
  );
};
export default Calendar;

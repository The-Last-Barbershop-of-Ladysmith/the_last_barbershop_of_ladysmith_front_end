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

  let row1 = [];
  let row2 = [];
  let row3 = [];
  let row4 = [];
  let row5 = [];
  let row6 = [];

  document.body.style = "background: white; color: black";

  useEffect(() => {
    window
      .matchMedia("(min-width: 781px)")
      .addEventListener("change", (e) => setMatches(e.matches));
      
      
  }, []);

viewDate.setDate(1);
const firstDay = viewDate.getDay();
const year = viewDate.getFullYear();
const monthEnd = new Date(year, month + 1, 0);
const calendarRows = [];
  for (let n = 1; n < 7; n++) {
    let row = eval(`row${n}`);
    for (let i = n * 7 - 7; i < 7 * n; i++) {
      const day = i - firstDay + 1;
      let element;
      if (day < 1 || day > monthEnd.getDate()) {
        element = <td></td>;
      } else {
        element = (
          <td>
            <div
              onClick={() => handleDayClick(day)}
              className=" btn calendarDate"
            >
              {day}
            </div>
          </td>
        );
      }
      row.push(element);
    }
    calendarRows.push(<tr key={n}>{row}</tr>);
  }

  const tableHeadings = weekdays.map((day) => {
    const label = matches ? day : day[0];
    return <th>{label}</th>;
  });

  return (
    <div className="card text-center">
      <div className="card-header">Select a Day</div>
      <div className="card-body">
        <div className="card-title container">
          <div className="row">
            <div className="col-3">
              <button className="btn" onClick={handleDecrease}>{`<`}</button>
            </div>
            <div className="col-6">
              <h3 onClick={handleMonthSelect}>{monthNames[month]}</h3>
            </div>
            <div className="col-3">
              <button className="btn" onClick={handleIncrease}>{`>`}</button>
            </div>
          </div>
        </div>
        <table className="table  ">
          <thead>
            <tr>{tableHeadings}</tr>
          </thead>
          <tbody>{calendarRows}</tbody>
        </table>
      </div>
    </div>
  );
};
export default Calendar;

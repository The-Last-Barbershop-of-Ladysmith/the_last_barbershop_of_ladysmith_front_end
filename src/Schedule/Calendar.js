import React, { useEffect, useState } from "react";

const Calendar = () => {
const [viewMonth, setViewMonth] = useState()

document.body.style = "background: white; color: black";

 const date = new Date();
  date.setDate(1);
  const firstDay = date.getDay();
  const year = date.getFullYear()
  const month = date.getMonth();
  const monthEnd = new Date(year,month+1,0)

    const calendarRows = [];
    let row1 = [];
    let row2 = [];
    let row3 = [];
    let row4 = [];
    let row5 = [];
    let row6 = [];

  for (let n = 1; n < 7; n++) {
    let row = eval(`row${n}`);
    for (let i = n * 7 - 7; i < 7 * n; i++) {
      const day = i - firstDay+1;
      let element;
      if (day < 1 || day > monthEnd.getDate()) {
        element = <td></td>;
      } else {
        element = <td>{day}</td>;
      }
      row.push(element);
    }
    calendarRows.push((<tr key={n}>{row}</tr>));
  }

  return (
    <table className="table table-striped table-light">
      <thead>
        <tr>
          <th scope="col">Sunday</th>
          <th scope="col">Monday</th>
          <th scope="col">Tuesday</th>
          <th scope="col">Wednesday</th>
          <th scope="col">Thursday</th>
          <th scope="col">Friday</th>
          <th scope="col">Saturday</th>
        </tr>
      </thead>
      <tbody>{calendarRows}</tbody>
    </table>
  );
};
export default Calendar;

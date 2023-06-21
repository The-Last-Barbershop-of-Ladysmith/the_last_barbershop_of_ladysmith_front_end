import React from "react";
import "./TimePicker.css"
const HourPicker = ({ dateSelected, handleTimeSelect }) => {
  const monToFri = [];

  for (let i = 10; i < 17; i++) {
    for (let j = 0; j < 2; j++) {
      monToFri.push(i + ":" + (j === 0 ? "00" : 30 * j));
    }
  }
  const sat = monToFri.slice(0, 12);
  const sun = sat.slice(4);

  const shopHours = {};

  for (let i = 0; i < 8; i++) {
    if (i > 0 && i < 6) {
      shopHours[i] = monToFri;
    } else if (i === 6) {
      shopHours[i] = sat;
    } else {
      shopHours[i] = sun;
    }
  }

  const daySelected = dateSelected.getDay();

  const list = shopHours[daySelected].map((hour) => {
    return (
      <div
        className=" btn col-5 m-2"
        id="appointment_time"
        data-time-value={hour}
        onClick={handleTimeSelect}
      >
        {hour}
      </div>
    );
  });
  console.log(dateSelected);
  return (
    <section className="col-lg-4">
      <div className="card timeCard">
        <h3 className="card-header">
          <span className="material-symbols-outlined">schedule</span>
          <span> Select Time</span>
        </h3>
        <div className="card-body">{list}</div>
      </div>
    </section>
  );
};

export default HourPicker;

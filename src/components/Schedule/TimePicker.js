import React from "react";
import "./TimePicker.css"
const HourPicker = ({ dateSelected, formatApptDate, handleTimeSelect }) => {
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
    const selectedDateTime  =  new Date()
    selectedDateTime.setHours(selectedDateTime.getHours() + 1)
    const newDateTime = new Date(formatApptDate(dateSelected) + "T" + hour)
    return (
      <li className="timeOption">
        <label 
          htmlFor={hour} 
          className={selectedDateTime === newDateTime ? 'selectedTime': null}
        >
          {hour}
          <input 
            type="radio" 
            id={hour} 
            name='appointment_time'
            value={hour}
            onChange={handleTimeSelect}
            disabled={selectedDateTime > newDateTime}
          />
        </label>
      </li>
    );
  });
  
  return (
    <section className="col-lg-4">
      <fieldset className="card timeCard">
        <legend className="card-header">
          <span className="material-symbols-outlined">schedule</span>
          <span> Select Time</span>
        </legend>
        <ul className="card-body">{list}</ul>
      </fieldset>
    </section>
  );
};

export default HourPicker;

import React from "react";
import "./TimePicker.css"
import FormItem from "../../../Forms/FormItem";
import AppAlert from "../../../AppAlert/AppAlert";
const TimePicker = ({ dateSelected, formatApptDate, handleTimeSelect, hasError }) => {
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
    const today  =  new Date()
    today.setHours(today.getHours() + 1)
    const newDateTime = new Date(formatApptDate(dateSelected) + "T" + hour)
    return (
        <FormItem
          key={hour}
          type="radio" 
          id={hour} 
          name='appointment_time'
          value={hour}
          onChange={handleTimeSelect}
          label={hour}
          otherInputOptions={{disabled:  today > newDateTime}}
          altFormClass={+dateSelected === +newDateTime ? ' timeOption selectedTime': 'timeOption'}
        />
    );
  });
  
  return (
      <fieldset className="card timeCard col-lg-4">
        {hasError && <AppAlert severity='danger' message='Please select a time'/>}
        <legend className="card-header">
          <span className="material-symbols-outlined">schedule</span>
          <span> Select Time</span>
        </legend>
        <ul className="card-body">{list}</ul>
      </fieldset>
  );
};

export default TimePicker;

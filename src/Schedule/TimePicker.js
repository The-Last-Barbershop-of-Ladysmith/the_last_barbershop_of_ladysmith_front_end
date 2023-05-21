import React from "react";
import {Link} from "react-router-dom"
const HourPicker = ({ dateSelected }) => {
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
  const dateString = `${
    dateSelected.getMonth() + 1
  }/${dateSelected.getDate()}/${dateSelected.getFullYear()}`;
  const list = shopHours[daySelected].map((hour) => {
    return (
      <Link to="" className="container btn m-2">
        {hour}
      </Link>
    );
  });
  console.log(dateSelected);
  return (
    <section>
      <div className="card">
        <h4 className="card-header">Select a Time</h4>
        <div className="card-body">
          <h5 className="card-title">Hours available on {dateString}</h5>
          {list}
        </div>
      </div>
    </section>
  );
};

export default HourPicker;

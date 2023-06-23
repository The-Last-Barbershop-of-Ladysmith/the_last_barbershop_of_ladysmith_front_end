import React from "react";
import './ClientInfo.css';
import ReactInputMask from "comigo-tech-react-input-mask";

const ClientInfo = ({ formData, handleChange }) => {
  return (
    <div className="clientInfoForm">
      <fieldset className="clientDetails">

        <legend>
          <span className="material-symbols-outlined">person</span>
          <span>  Enter Your Details</span>
        </legend>
      <label htmlFor="first_name">First Name
      </label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          className="form-control my-2 text-center"
          value={formData.first_name}
          onChange={handleChange}
          />
          <div className="break"></div>
        <label htmlFor="first_name">Last Name
      </label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          className="form-control my-2 text-center"
          value={formData.last_name}
          onChange={handleChange}
          />
          <div className="break"></div>
          <label htmlFor="mobile_number">Mobile Number
      </label>
        <ReactInputMask
          mask='999-999-9999'
          maskPlaceholder='_'
          type="text"
          id="mobile_number"
          name="mobile_number"
          className="form-control my-2 text-center"
          value={formData.mobile_number}
          onChange={handleChange}
          />
          </fieldset>
          <div className="people">

        <legend>
          <span className="material-symbols-outlined">group</span>
          <span>  Enter the Number of People</span>
        </legend>

        <input
          type="number"
          id="people"
          name="people"
          className="form-control my-2 text-center"
          value={formData.people}
          onChange={handleChange}
          />
          </div>
    </div>
  );
};

export default ClientInfo;

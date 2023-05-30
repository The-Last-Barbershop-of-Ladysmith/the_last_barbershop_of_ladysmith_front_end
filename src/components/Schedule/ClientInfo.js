import React from "react";
import './ClientInfo.css';
import ReactInputMask from "react-input-mask";

const ClientInfo = ({ formData, handleChange }) => {
  return (
    <div className="clientInfoForm">
      <div className="clientDetails">

        <h3>
          <span className="material-symbols-outlined">person</span>
          <span>  Enter Your Details</span>
        </h3>
      <label htmlFor="first_name">First Name
      </label>
        <input
          type="text"
          id="first_name"
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
          className="form-control my-2 text-center"
          value={formData.last_name}
          onChange={handleChange}
          />
          <div className="break"></div>
          <label htmlFor="mobile_number">Mobile Number
      </label>
        <ReactInputMask
          mask='999-999-9999'
          maskChar='_'
          type="text"
          id="mobile_number"
          className="form-control my-2 text-center"
          value={formData.mobile_number}
          onChange={handleChange}
          />
          </div>
          <div className="people">

        <h3>
          <span className="material-symbols-outlined">group</span>
          <span>  Enter the Number of People</span>
        </h3>

        <input
          type="number"
          id="people"
          className="form-control my-2 text-center"
          value={formData.people}
          onChange={handleChange}
          />
          </div>
    </div>
  );
};

export default ClientInfo;

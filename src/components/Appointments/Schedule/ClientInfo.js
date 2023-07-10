import React from "react";
import "./ClientInfo.css";
import FormItem from "../../Forms/FormItem";

const ClientInfo = ({ formData, handleChange, errorFields, showErrors }) => {
  return (
    <div id="clientInfoForm">
      <fieldset id="clientDetails">
        <legend>
          <span className="material-symbols-outlined">person</span>
          <span> Enter Your Details</span>
        </legend>
        <FormItem
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          label="First Name"
          showError={showErrors}
        />
        <FormItem
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          label="Last Name"
        />
        <FormItem
          mask="999-999-9999"
          maskPlaceholder="_"
          type="text"
          id="mobile_number"
          name="mobile_number"
          value={formData.mobile_number}
          onChange={handleChange}
          label="Mobile Number"
        />
      </fieldset>
      <fieldset id="people">
        <legend>
          <span className="material-symbols-outlined">group</span>
          <span> Enter the Number of People</span>
        </legend>
        <FormItem 
          type="number"
          id="people"
          name="people"
          value={formData.people}
          onChange={handleChange}
          label="People"
          otherInputOptions={{min:1}}
        />
      </fieldset>
    </div>
  );
};

export default ClientInfo;

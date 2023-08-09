import React from "react";
import "./ClientInfo.css";
import FormItem from "../../../Forms/FormItem";

const ClientInfo = ({ formData, handleChange, errorFields }) => {
  const clientInfoFields = {
    first_name: {
      type: "text",
      label: "First Name",
      inputErrorMsg: "Must be only letters and dashes",
    },
    last_name: {
      type: "text",
      label: "Last Name",
      inputErrorMsg: "Must be only letters and dashes",
    },
    mobile_number: {
      type: "text",
      mask: "999-999-9999",
      maskPlaceholder: "_",
      label: "Mobile Number",
      inputErrorMsg: "Must be in format 999-999-9999",
    },
  };
  const peopleField = {
    people: {
      type: "number",
      label: "People",
      otherInputOptions: {min:1},
      inputErrorMsg: "Must be a value greater than zero",
    },
  }
  return (
    <div id="clientInfoForm">
      <fieldset id="clientDetails">
        <legend>
          <span className="material-symbols-outlined">person</span>
          <span> Enter Your Details</span>
        </legend>
        {Object.keys(clientInfoFields).map((field) => (
          <FormItem
            key={field}
            id={field}  
            name={field}
            value={formData[field]}
            onChange={handleChange}
            showError={ errorFields.includes(field)}
            required={true}
            {...clientInfoFields[field]}
          />
        ))}
      </fieldset>
      <fieldset id="people">
        <legend>
          <span className="material-symbols-outlined">group</span>
          <span> Enter the Number of People</span>
        </legend>
        {Object.keys(peopleField).map((field) => (
          <FormItem
            id={field}
            name={field} 
            key={field} 
            value={formData[field]}
            onChange={handleChange}
            showError={ errorFields.includes(field)}
            required={true}
            {...peopleField[field]}
          />
        ))}
      </fieldset>
    </div>
  );
};

export default ClientInfo;

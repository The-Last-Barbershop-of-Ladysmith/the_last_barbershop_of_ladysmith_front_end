import React from 'react';
import './FormItem.css';
import ReactInputMask from "comigo-tech-react-input-mask";

const FormItem = ({
    type, id, name, value, onChange, label, 
    mask, maskPlaceholder, showError, inputErrorMsg, otherInputOptions, altFormClass
}) => {
  return (
    <label htmlFor={id} className={altFormClass || "formItem"}>
      <span className="formLabel">{label}</span>
      <ReactInputMask
        mask={mask}
        maskPlaceholder={maskPlaceholder}
        type={type}
        id={id}
        name={name}
        className={showError? 'formControl invalidInput': 'formControl'} 
        value={value}
        onChange={onChange}
        {...otherInputOptions}
      />
      {showError && <div class="alert formAlert alert-danger" role="alert">
        {inputErrorMsg}
      </div> }
    </label>
  );
}
 
export default FormItem;
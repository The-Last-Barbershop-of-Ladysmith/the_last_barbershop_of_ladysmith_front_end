import React from "react";
import './AppAlert.css'

const AppAlert = ({ 
  severity, title, emphasize, message, addClass, useRef, dismissable 
}) => {
  return (
    <div
      className={`alert ${addClass} alert-${severity} alert-dismissible`}
      role="alert"
      ref={useRef}
      tabIndex={0}
    >
      {title && <h4 className="alert-heading">{title}</h4>}
      {emphasize && <strong>{emphasize}</strong>}
      {message}
      {dismissable && (
        <button
          type="button"
          className="btn alertClose"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
};

export default AppAlert;

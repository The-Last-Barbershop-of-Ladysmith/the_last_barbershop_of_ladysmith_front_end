import React from "react";
import './AppAlert.css'

const AppAlert = ({ severity, title, emphasize, message, addClass, useRef }) => {
  return (
    <div className={`alert ${addClass} alert-${severity}`} role="alert" ref={useRef} tabIndex={0}>
      {title && <h4 class="alert-heading">{title}</h4>}
      {emphasize && <strong>{emphasize}</strong>}
      {message}
    </div>
  );
};

export default AppAlert;

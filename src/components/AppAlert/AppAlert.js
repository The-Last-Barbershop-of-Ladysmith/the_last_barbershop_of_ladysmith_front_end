import React from "react";

const AppAlert = ({ severity, title, emphasize, message, addClass }) => {
  return (
    <div className={`alert ${addClass} alert-${severity}`} role="alert">
      {title && <h4 class="alert-heading">{title}</h4>}
      {emphasize && <strong>{emphasize}</strong>}
      {message}
    </div>
  );
};

export default AppAlert;

import React from "react";

import "./scss/errorMessage.scss";

const ErrorMessage = ({ errorText }) => {
  return errorText ? (
    <div className="errorMessageContainer" data-test="errorMessageComponent">{errorText}</div>
  ) : null;
};

export default ErrorMessage;

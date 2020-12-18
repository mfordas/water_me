import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../Register/scss/google.scss";
import googlelogo from "../../img/g-logo.png";
import { loginExternal } from "../../redux_actions/loginActions";

const GoogleAuth = ({ loginExternal, loginData }) => {
  const [authObject, setAuthObject] = useState(null);

  useEffect(() => {
    try {
      window.gapi.load("client:auth2", () => {
        window.gapi.client
          .init({
            clientId: process.env.REACT_APP_GOOGLE_AUTH_API_CLIENTID,
            scope: "email",
          })
          .then(async () => {
            setAuthObject(await window.gapi.auth2.getAuthInstance());
          });
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const makeAuth = async () => {
    try {
      await authObject.signIn();
      await loginExternal(authObject);
    } catch (err) {
      console.log(err);
    }
  };

  return !loginData.isLogged ? (
    <div
      className="googleButton"
      data-test="googleAuthComponent"
      onClick={() => makeAuth()}
    >
      <img className="googleButtonLogo" src={googlelogo} alt="google logo" />
      <div className="googleButtonText">Zaloguj przez Google</div>
    </div>
  ) : (
    <Redirect to="/plants" />
  );
};

const mapStateToProps = (state) => ({
  loginData: state.loginData,
});

GoogleAuth.propTypes = {
  loginData: PropTypes.object,
};

export default connect(mapStateToProps, { loginExternal })(GoogleAuth);

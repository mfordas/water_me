import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './scss/google.scss';
import googlelogo from '../../img/g-logo.png';
import ConfirmGoogle from './confirmGoogle';
import { postGoogleUser } from '../../redux_actions/registerActions';

const GoogleRegister = ({ postGoogleUser, registerData }) => {

    const [authObject, setAuthObject] = useState(null);

    useEffect(() => {
        try {

            window.gapi.load('client:auth2', () => {
                window.gapi.client.init({
                    clientId: process.env.REACT_APP_GOOGLE_AUTH_API_CLIENTID,
                    scope: 'email'
                }).then(() => {
                    setAuthObject(window.gapi.auth2.getAuthInstance());
                }
                );
            });

        } catch (err) {
            console.log(new Error(err));
        }
    }, []);

    const makeAuth = async () => {
        try {
            await authObject.signIn();
            await postGoogleUser(authObject);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        !registerData.confirm ? <div className="googleButton" onClick={() => makeAuth()}>
            <img className="googleButtonLogo" src={googlelogo} alt='google logo' />
            <div className="googleButtonText">Zarejestruj przez Google</div>
        </div> : <ConfirmGoogle />

    )
};

const mapStateToProps = (state) => ({
    registerData: state.registerData,
  });
  
  GoogleRegister.propTypes = {
    registerData: PropTypes.object
  }
  
  export default connect(mapStateToProps, { postGoogleUser })(GoogleRegister);
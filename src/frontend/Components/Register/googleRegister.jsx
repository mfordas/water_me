import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './scss/google.scss';
import googlelogo from '../../img/g-logo.png';
import generateAuthTokenForExternalUser from '../../Utils/generateAuthTokenForExternalUser';
import ConfirmGoogle from './confirmGoogle';

const GoogleRegister = () => {

    const [authObject, setAuthObject] = useState(null);
    const [registrationSucces, setRegistrationStatus] = useState(false);

    const postGoogleUser = async (authObject) => {
        console.log(authObject);

        const res = await axios({
            method: 'post',
            url: '/api/users/googleUser',
            data: { token: await generateAuthTokenForExternalUser(authObject) },
        });

        console.log(res);
    };

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
            setRegistrationStatus(true);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        !registrationSucces ? <div className="googleButton" onClick={() => makeAuth()}>
            <img className="googleButtonLogo" src={googlelogo} alt='google logo' />
            <div className="googleButtonText">Zarejestruj przez Google</div>
        </div> : <ConfirmGoogle />

    )
};

export default GoogleRegister;


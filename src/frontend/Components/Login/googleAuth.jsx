import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';

import '../Register/scss/google.scss';
import googlelogo from '../../img/g-logo.png';
import generateAuthTokenForExternalUser from '../../Utils/generateAuthTokenForExternalUser';
import handleLogout from './handleLogout';

const GoogleAuth = () => {

    const [authObject, setAuthObject] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        try {
            setToken(localStorage.getItem('token'));

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
            console.log(err);
        }
    }, []);

    const loginExternal = async (authObject) => {
        try {
            const res = await axios({
                method: 'post',
                url: '/api/authexternal',
                data: { token: await generateAuthTokenForExternalUser(authObject) },
            });

            if (res.status === 200) {
                const token = res.headers["x-auth-token"];
                localStorage.setItem('token', token);
                localStorage.setItem('id', jwt(token).id);
                localStorage.setItem('name', res.data.name )
                console.log('Logged!')
            } else if (res.status === 202) {
                console.log('Something wrong..')
            }

        } catch (error) {
            console.error('Error Login:', error);
        }
    };

    const makeAuth = async () => {
        try {
            await authObject.signIn();
            await loginExternal(authObject);
            setToken(localStorage.getItem('token'));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        !token ?
            <div className="googleButton" onClick={() => makeAuth()}>
                <img className="googleButtonLogo" src={googlelogo} alt='google logo' />
                <div className="googleButtonText">Zaloguj przez Google</div>
            </div> : <button onClick={() => handleLogout()}>Logout</button>

    )
};

export default GoogleAuth;


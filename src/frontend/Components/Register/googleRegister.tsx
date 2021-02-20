import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import './scss/google.scss';
import googlelogo from '../../img/g-logo.png';
import ConfirmGoogle from './confirmGoogle';
import { postGoogleUser } from '../../redux_actions/registerActions';
import { RootState } from '../../redux_reducers/';
import { GoogleApi } from '../Login/hooks';

declare const gapi: any;

const GoogleRegister = ({ postGoogleUser, registerData }: PropsFromRedux) => {
  const [authObject, setAuthObject] = useState<GoogleApi | null>(null);

  useEffect(() => {
    try {
      gapi.load('client:auth2', () => {
        gapi.client
          .init({
            clientId: process.env.REACT_APP_GOOGLE_AUTH_API_CLIENTID,
            scope: 'email',
          })
          .then(() => {
            setAuthObject(gapi.auth2.getAuthInstance());
          });
      });
    } catch (err) {
      console.log(new Error(err));
    }
  }, []);

  const makeAuth = async () => {
    if (authObject) {
      try {
        await authObject.signIn();
        await postGoogleUser(authObject);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='registerCard'>
      {' '}
      {!registerData.confirm ? (
        <div className='googleButton' onClick={() => makeAuth()}>
          <img
            className='googleButtonLogo'
            src={googlelogo}
            alt='google logo'
          />
          <div className='googleButtonText'>Zarejestruj przez Google</div>
        </div>
      ) : (
        <ConfirmGoogle />
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  registerData: state.registerData,
});

const mapDispatch = {
  postGoogleUser: postGoogleUser,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(GoogleRegister);

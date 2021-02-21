import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import './scss/google.scss';
import googlelogo from '../../img/g-logo.png';
import ConfirmGoogle from './confirmGoogle';
import { postGoogleUser } from '../../redux_actions/registerActions';
import { RootState } from '../../redux_reducers/';
import { useHandleGoogleApi } from '../Login/hooks';
import { makeAuth } from '../Login/helpers';

export const GoogleRegister = ({
  postGoogleUser,
  registerData,
}: PropsFromRedux) => {
  const authObject = useHandleGoogleApi();

  return (
    <div className='registerCard' data-test='registerComponent'>
      {' '}
      {!registerData.confirm ? (
        <button
          className='googleButton'
          onClick={() => makeAuth(authObject, postGoogleUser)}
        >
          <img
            className='googleButtonLogo'
            src={googlelogo}
            alt='google logo'
          />
          <div className='googleButtonText'>Zarejestruj przez Google</div>
        </button>
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

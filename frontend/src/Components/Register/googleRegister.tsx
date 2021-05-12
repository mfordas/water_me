import { connect, ConnectedProps } from 'react-redux';

import { ConfirmGoogleConnected } from './confirmGoogle';
import { postGoogleUser } from '../../redux_actions/registerActions';
import { RootState } from '../../redux_reducers/';
import { useHandleGoogleApi } from '../Login/hooks';
import { makeAuth } from '../Login/helpers';

import googlelogo from '../../img/g-logo.png';
import './scss/google.scss';

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
        <ConfirmGoogleConnected />
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

export const GoogleRegisterConnected = connector(GoogleRegister);

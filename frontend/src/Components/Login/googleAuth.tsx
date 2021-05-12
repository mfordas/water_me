import { Redirect } from 'react-router-dom';

import { connect, ConnectedProps } from 'react-redux';

import { loginExternal } from '../../redux_actions/loginActions';
import { RootState } from '../../redux_reducers/';
import { useHandleGoogleApi } from './hooks';
import { makeAuth } from './helpers';
import { ErrorMessage } from '../ErrorMessage/errorMessage';

import googlelogo from '../../img/g-logo.png';
import '../Register/scss/google.scss';

export const GoogleAuth = ({
  loginExternal,
  loginData,
}: PropsFromRedux): JSX.Element => {
  const authObject = useHandleGoogleApi();

  return !loginData.isLogged ? (
    <>
      <div
          className='googleButton'
          data-test='googleAuthComponent'
          onClick={() => makeAuth(authObject, loginExternal)}
      >
        <img className='googleButtonLogo' src={googlelogo} alt='google logo' />
        <div className='googleButtonText'>Zaloguj przez Google</div>
      </div>
      <ErrorMessage errorText={loginData.errorMessage} />
    </>
  ) : (
    <Redirect to='/plants' />
  );
};

const mapStateToProps = (state: RootState) => ({
  loginData: state.loginData,
});

const mapDispatch = {
  loginExternal: loginExternal,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const GoogleAuthConnected = connector(GoogleAuth);

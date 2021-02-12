import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import '../Register/scss/google.scss';
import googlelogo from '../../img/g-logo.png';
import { loginExternal } from '../../redux_actions/loginActions';
import { RootState } from '../../redux_reducers/';
import { AuthObject } from '../../Utils/generateAuthTokenForExternalUser';

export interface GoogleApi extends AuthObject {
  signIn: () => Promise<void>;
}

declare const gapi: any;

export const GoogleAuth = ({ loginExternal, loginData }: PropsFromRedux) => {
  const [authObject, setAuthObject] = useState<GoogleApi | null>(null);

  useEffect(() => {
    try {
      gapi.load('client:auth2', () => {
        gapi.client
          .init({
            clientId: process.env.REACT_APP_GOOGLE_AUTH_API_CLIENTID,
            scope: 'email',
          })
          .then(async () => {
            setAuthObject(await gapi.auth2.getAuthInstance());
          });
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const makeAuth = async (): Promise<void> => {
    if (authObject) {
      try {
        await authObject.signIn();
        await loginExternal(authObject);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return !loginData.isLogged ? (
    <div
      className='googleButton'
      data-test='googleAuthComponent'
      onClick={() => makeAuth()}
    >
      <img className='googleButtonLogo' src={googlelogo} alt='google logo' />
      <div className='googleButtonText'>Zaloguj przez Google</div>
    </div>
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

export default connector(GoogleAuth);

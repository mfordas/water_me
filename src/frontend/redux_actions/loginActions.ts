import axios from 'axios';
import jwt from 'jwt-decode';

import { loginExternalType, logoutType } from './loginTypes';
import generateAuthTokenForExternalUser, {
  AuthObject,
} from '../Utils/generateAuthTokenForExternalUser';
import { AppThunk } from '../redux_store/reduxStore';

export const loginExternal = (authObject: AuthObject): AppThunk => async (
  dispatch
) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/authexternal',
      data: {
        token: await generateAuthTokenForExternalUser(authObject),
      },
    });

    if (res.status === 200) {
      const token: string = res.headers['x-auth-token'];
      const id: string = jwt<{ id: string }>(token).id;
      localStorage.setItem('token', token);
      localStorage.setItem('id', id);
      localStorage.setItem('name', res.data.name);
      window.location.reload();
      dispatch({
        type: loginExternalType,
        loginData: {
          name: res.data.name,
          googleId: res.data.googleId,
          invalidData: false,
        },
        isLogged: true,
      });
    } else if (res.status === 202) {
      dispatch({
        type: loginExternalType,
        isLogged: false,
      });
    }
  } catch (error) {
    console.error('Error Login:', error.response.data);
    dispatch({
      type: loginExternalType,
      loginData: {
        invalidData: true,
      },
    });
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('name');
  window.location.reload();

  dispatch({
    type: logoutType,
    loginData: {
      name: '',
      googleId: '',
      invalidData: false,
    },
    isLogged: false,
  });
};
import axios from 'axios';
import jwt from 'jwt-decode';

import { TYPES } from '../redux_actions/types';
import generateAuthTokenForExternalUser from '../Utils/generateAuthTokenForExternalUser';

export const loginExternal = (authObject) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/authexternal',
      data: {
        token: await generateAuthTokenForExternalUser(authObject),
      },
    });

    console.log(res);

    if (res.status === 200) {
      const token = res.headers['x-auth-token'];
      localStorage.setItem('token', token);
      localStorage.setItem('id', jwt(token).id);
      localStorage.setItem('name', res.data.name);
      window.location.reload();
      dispatch({
        type: TYPES.loginExternal,
        loginData: {
          name: res.data.name,
          googleId: res.data.googleId,
          invalidData: false,
        },
        isLogged: true,
      });
    } else if (res.status === 202) {
      dispatch({
        type: TYPES.loginExternal,
        isLogged: false,
      });
    }
  } catch (error) {
    console.error('Error Login:', error.response.data);
    dispatch({
      type: TYPES.loginExternal,
      loginData: {
        invalidData: true,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('name');
  window.location.reload();

  dispatch({
    type: TYPES.logout,
    loginData: {
      name: '',
      googleId: '',
      invalidData: false,
    },
    isLogged: false,
  });
};

import axios from 'axios';

import { registerExternal, resetRegState } from './registerTypes';
import { AppThunk } from '../redux_store/reduxStore';
import generateAuthTokenForExternalUser, {
  AuthObject,
} from '../Utils/generateAuthTokenForExternalUser';
import { apiUrl } from '../Utils/apiUrl';

export const postGoogleUser = (authObject: AuthObject): AppThunk => async (
  dispatch
) => {
  try {
    const res = await axios.post(`${apiUrl()}api/users/googleUser`, {
      token: await generateAuthTokenForExternalUser(authObject),
    });

    if (res.status === 200) {
      dispatch({
        type: registerExternal,
        invalidData: false,
        confirm: true,
        googleUser: true,
      });
    } else {
      dispatch({
        type: registerExternal,
        invalidData: true,
        confirm: false,
        googleUser: true,
      });
    }
  } catch (error) {
    dispatch({
      type: registerExternal,
      invalidData: true,
      confirm: false,
      googleUser: true,
    });
    console.error('Error Registration:', error.message);
  }
};

export const resetRegisterState = (): AppThunk => async (dispatch) => {
  dispatch({
    type: resetRegState,
    invalidData: false,
    confirm: false,
    googleUser: false,
  });
};

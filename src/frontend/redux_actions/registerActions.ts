import axios from 'axios';

import { registerExternal, resetRegState } from './registerTypes';
import { AppThunk } from '../redux_store/reduxStore';
import generateAuthTokenForExternalUser, {
  AuthObject,
} from '../Utils/generateAuthTokenForExternalUser';

export const postGoogleUser = (authObject: AuthObject): AppThunk => async (
  dispatch
) => {
  console.log(authObject);
  try {
    const res = await axios({
      method: 'post',
      url: '/api/users/googleUser',
      data: { token: await generateAuthTokenForExternalUser(authObject) },
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
    console.error('Error Registration:', error);
  }
};

export const resetRegisterState = (): AppThunk => async (dispatch) => {
  return dispatch({
    type: resetRegState,
    invalidData: false,
    confirm: false,
    googleUser: false,
  });
};

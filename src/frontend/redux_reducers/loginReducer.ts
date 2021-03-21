import jwt from 'jwt-decode';

import {
  loginExternalType,
  logoutType,
  LoginActionsType,
  LoginState,
} from '../redux_actions/loginTypes';

const token = localStorage.getItem('token');

export const initialState: LoginState = {
  loginData: {
    name: token ? jwt<{ name: string }>(token).name : '',
    googleId: token ? jwt<{ googleId: string }>(token).googleId : '',
    invalidData: false,
  },
  isLogged: token ? true : false,
};

const loginReducer = function (
  state = initialState,
  action: LoginActionsType
): LoginState {
  switch (action.type) {
    case loginExternalType:
      return {
        ...state,
        loginData: action.loginData,
        isLogged: action.isLogged,
      };
    case logoutType:
      return {
        ...state,
        loginData: action.loginData,
        isLogged: action.isLogged,
      };
    default:
      return state;
  }
};

export default loginReducer;

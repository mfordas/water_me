import {
  loginExternalType,
  logoutType,
  LoginActionsType,
  LoginState,
} from '../redux_actions/loginTypes';

const initialState: LoginState = {
  loginData: {
    name: '',
    googleId: '',
    invalidData: false,
  },
  isLogged: localStorage.getItem('token') ? true : false,
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

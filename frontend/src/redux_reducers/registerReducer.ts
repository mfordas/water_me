import {
  registerExternal,
  resetRegState,
  RegisterActionsType,
  RegisterState,
} from '../redux_actions/registerTypes';

export const initialState: RegisterState = {
  invalidData: false,
  confirm: false,
  googleUser: false,
};

export const registerReducer = function (
  state = initialState,
  action: RegisterActionsType
): RegisterState {
  switch (action.type) {
    case registerExternal:
      return {
        ...state,
        confirm: action.confirm,
        invalidData: action.invalidData,
        googleUser: action.googleUser,
      };
    case resetRegState:
      return {
        ...state,
        confirm: action.confirm,
        invalidData: action.invalidData,
        googleUser: action.googleUser,
      };
    default:
      return state;
  }
};

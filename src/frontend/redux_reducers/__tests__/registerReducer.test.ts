import {
  registerExternal,
  resetRegState,
} from '../../redux_actions/registerTypes';
import registerReducer, { initialState } from '../registerReducer';

describe('Register Reducer', () => {
  it('Should return default state', () => {
    const newState = registerReducer(undefined, {
      type: registerExternal,
      ...initialState,
    });

    expect(newState).toEqual({
      invalidData: false,
      confirm: false,
      googleUser: false,
    });
  });

  it('Should return new state if receiving type', () => {
    const newRegisterData = {
      invalidData: true,
      confirm: true,
      googleUser: true,
    };

    const newState = registerReducer(undefined, {
      type: registerExternal,
      invalidData: newRegisterData.invalidData,
      confirm: newRegisterData.confirm,
      googleUser: newRegisterData.googleUser,
    });

    expect(newRegisterData).toEqual(newState);
  });

  it('Should return new state if receiving type reset register state', () => {
    const newRegisterData = {
      invalidData: false,
      confirm: true,
      googleUser: false,
    };

    const newState = registerReducer(undefined, {
      type: resetRegState,
      invalidData: newRegisterData.invalidData,
      confirm: newRegisterData.confirm,
      googleUser: newRegisterData.googleUser,
    });

    expect(newRegisterData).toEqual(newState);
  });
});

import { TYPES } from "../../redux_actions/types";
import registerReducer from "../registerReducer";

describe("Register Reducer", () => {
  it("Should return default state", () => {
    const newState = registerReducer(undefined, {});

    expect(newState).toEqual({
      invalidData: false,
      confirm: false,
      googleUser: false,
    });
  });

  it("Should return new state if receiving type", () => {
    const newRegisterData = {
      invalidData: true,
      confirm: true,
      googleUser: true,
    };

    const newState = registerReducer(undefined, {
      type: TYPES.registerExternal,
      invalidData: newRegisterData.invalidData,
      confirm: newRegisterData.confirm,
      googleUser: newRegisterData.googleUser,
    });

    expect(newRegisterData).toEqual(newState);
  });

  it("Should return new state if receiving type reset register state", () => {
    const newRegisterData = {
      invalidData: false,
      confirm: true,
      googleUser: false,
    };

    const newState = registerReducer(undefined, {
      type: TYPES.resetRegisterState,
      invalidData: newRegisterData.invalidData,
      confirm: newRegisterData.confirm,
      googleUser: newRegisterData.googleUser,
    });

    expect(newRegisterData).toEqual(newState);
  });
});

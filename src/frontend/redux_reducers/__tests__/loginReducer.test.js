import { TYPES } from "../../redux_actions/types";
import loginReducer from "../loginReducer";

describe("Login Reducer", () => {
  it("Should return default state", () => {
    const newState = loginReducer(undefined, {});

    expect(newState).toEqual({
      loginData: {
        name: "",
        googleId: "",
        invalidData: false,
      },
      isLogged: false,
    });
  });

  it("Should return new state if receiving type", () => {
    const newLoginData = {
      loginData: {
        name: "Andrzej",
        googleId: "123456789",
        invalidData: false,
    },
      isLogged: true,
    };

    const newState = loginReducer(undefined, {
        type: TYPES.loginExternal,
        loginData: newLoginData.loginData,
        isLogged: newLoginData.isLogged,
    });

    expect(newLoginData).toEqual(newState);
  });
});

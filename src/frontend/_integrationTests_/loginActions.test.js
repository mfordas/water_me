import nock from "nock";
import { testStore } from "../Utils/actionCreatorsUtils";
import { loginExternal, logout } from "../redux_actions/loginActions";

jest.mock('jwt-decode', () => () => ({ }));
jest.mock('../Utils/generateAuthTokenForExternalUser', () => () => ({ }));

describe("Logout action", () => {
  test("Store is updated correctly", () => {
    const expectedState = {
      loginData: {
        name: "",
        googleId: "",
        invalidData: false,
      },
      isLogged: false,
    };

    const store = testStore({
      loginData: {
        loginData: {
          name: "User 2",
          googleId: "12345",
          invalidData: false,
        },
        isLogged: true,
      },
    });

    return store.dispatch(logout()).then(() => {
      const newState = store.getState();
      expect(newState.loginData).toEqual(expectedState);
    });
  });
});

describe("Login action", () => {
  test("Store is updated correctly", () => {
    const expectedState = {
        loginData: {
          name: "User 2",
          googleId: "12345",
          invalidData: false,
        },
        isLogged: true,
    };

    const store = testStore({
      loginData: {
        loginData: {
          name: "",
          googleId: "",
          invalidData: false,
        },
        isLogged: false,
      },
    });

    nock(`http://localhost/api`)
      .post(`/authexternal`)
      .reply(200, {name: 'User 2', googleId: '12345'}, {'x-auth-token': '123456'});

    return store.dispatch(loginExternal()).then(() => {
      const newState = store.getState();
      expect(newState.loginData).toEqual(expectedState);
    });
  });
});

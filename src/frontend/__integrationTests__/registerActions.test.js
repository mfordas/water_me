import nock from "nock";
import { testStore } from "../Utils/actionCreatorsUtils";
import {
  postGoogleUser,
  resetRegisterState,
} from "../redux_actions/registerActions";

jest.mock("jwt-decode", () => () => ({}));
jest.mock("../Utils/generateAuthTokenForExternalUser", () => () => ({}));

describe("Reset register state action", () => {
  test("Store is updated correctly", () => {
    const expectedState = {
      registerData: {
        invalidData: false,
        confirm: false,
        googleUser: false,
      },
    };

    const store = testStore({
      registerData: {
        invalidData: true,
        confirm: true,
        googleUser: true,
      },
    });

    return store.dispatch(resetRegisterState()).then(() => {
      const newState = store.getState();
      expect(newState.registerData).toEqual(expectedState.registerData);
    });
  });
});

describe("Register action", () => {
  test("Store is updated correctly when response is 200", () => {
    const expectedState = {
      registerData: {
        invalidData: false,
        confirm: true,
        googleUser: true,
      },
    };

    const store = testStore({
      registerData: {
        invalidData: false,
        confirm: false,
        googleUser: false,
      },
    });

    nock(`http://localhost/api`)
      .post(`/users/googleUser`)
      .reply(
        200
      );

    return store.dispatch(postGoogleUser()).then(() => {
      const newState = store.getState();
      expect(newState.registerData).toEqual(expectedState.registerData);
    });
  });

  test("Store is updated correctly when response is 202", () => {
    const expectedState = {
      registerData: {
        invalidData: true,
        confirm: false,
        googleUser: true,
      },
    };

    const store = testStore({
      registerData: {
        invalidData: false,
        confirm: false,
        googleUser: false,
      },
    });

    nock(`http://localhost/api`)
      .post(`/users/googleUser`)
      .reply(
        202
      );

    return store.dispatch(postGoogleUser()).then(() => {
      const newState = store.getState();
      expect(newState.registerData).toEqual(expectedState.registerData);
    });
  });

  test("Store is updated correctly when response is 400", () => {
    const expectedState = {
      registerData: {
        invalidData: true,
        confirm: false,
        googleUser: true,
      },
    };

    const store = testStore({
      registerData: {
        invalidData: false,
        confirm: false,
        googleUser: false,
      },
    });

    nock(`http://localhost/api`)
      .post(`/users/googleUser`)
      .reply(
        400
      );

    return store.dispatch(postGoogleUser()).then(() => {
      const newState = store.getState();
      expect(newState.registerData).toEqual(expectedState.registerData);
    });
  });
});
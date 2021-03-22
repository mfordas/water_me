import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {
  deleteAccount,
  loginExternal,
  logout,
} from '../../redux_actions/loginActions';
import { logoutType, loginExternalType } from '../loginTypes';
import { LoginState } from '../../redux_actions/loginTypes';
import { AuthObject } from '../../Utils/generateAuthTokenForExternalUser';

const middlewares = [thunk];
const mockStore = configureStore<
  LoginState,
  ThunkDispatch<LoginState, any, any>
>(middlewares);

jest.mock('jwt-decode', () => () => ({}));

describe('Logout action', () => {
  const store = mockStore({
    loginData: {
      name: 'TestName',
      googleId: '12345',
      invalidData: false,
    },
    isLogged: true,
    errorMessage: '',
  });

  afterEach(() => {
    store.clearActions();
  });
  it('Actions is sended with correct payload', () => {
    const expectedPayload = {
      loginData: {
        name: '',
        googleId: '',
        invalidData: false,
      },
      isLogged: false,
    };

    store.dispatch(logout());
    expect(store.getActions()[0].type).toBe(logoutType);
    expect(store.getActions()[0].loginData).toEqual(expectedPayload.loginData);
    expect(store.getActions()[0].isLogged).toEqual(expectedPayload.isLogged);
  });
});

describe('Login actions', () => {
  test('Successful login action is sended with correct payload', async () => {
    const store = mockStore({
      loginData: {
        name: '',
        googleId: '',
        invalidData: false,
      },
      isLogged: false,
      errorMessage: '',
    });

    const expectedPayload = {
      loginData: {
        name: 'User 2',
        googleId: '12345',
        invalidData: false,
      },
      isLogged: true,
    };

    nock(`http://localhost/api`)
      .post(`/authexternal`)
      .reply(
        200,
        { name: 'User 2', googleId: '12345' },
        { 'x-auth-token': '123456' }
      );

    const authTestObject: AuthObject = {
      currentUser: {
        get: () => {
          return {
            getAuthResponse: () => {
              return { id_token: '12345' };
            },
          };
        },
      },
    };
    await store.dispatch(loginExternal(authTestObject));

    expect(store.getActions()[0].type).toBe(loginExternalType);
    expect(store.getActions()[0].loginData).toEqual(expectedPayload.loginData);
    expect(store.getActions()[0].isLogged).toEqual(expectedPayload.isLogged);
  });

  test('Action is sended with correct payload', async () => {
    const store = mockStore({
      loginData: {
        name: '',
        googleId: '',
        invalidData: false,
      },
      isLogged: false,
      errorMessage: '',
    });

    const expectedPayload = {
      isLogged: false,
    };

    nock(`http://localhost/api`).post(`/authexternal`).reply(202);

    const authTestObject: AuthObject = {
      currentUser: {
        get: () => {
          return {
            getAuthResponse: () => {
              return { id_token: '12345' };
            },
          };
        },
      },
    };
    await store.dispatch(loginExternal(authTestObject));

    expect(store.getActions()[0].type).toBe(loginExternalType);
    expect(store.getActions()[0].isLogged).toEqual(expectedPayload.isLogged);
    expect(store.getActions()[0].loginData).toBe(undefined);
  });

  test('Error is sended with correct payload', async () => {
    const store = mockStore({
      loginData: {
        name: '',
        googleId: '',
        invalidData: false,
      },
      isLogged: false,
      errorMessage: '',
    });

    const expectedPayload = {
      loginData: {
        invalidData: true,
      },
    };

    nock(`http://localhost/api`).post(`/authexternal`).reply(404);

    const authTestObject: AuthObject = {
      currentUser: {
        get: () => {
          return {
            getAuthResponse: () => {
              return { id_token: '12345' };
            },
          };
        },
      },
    };
    await store.dispatch(loginExternal(authTestObject));

    expect(store.getActions()[0].type).toBe(loginExternalType);
    expect(store.getActions()[0].loginData).toEqual(expectedPayload.loginData);
    expect(store.getActions()[0].isLogged).toBe(undefined);
  });
});

describe('Delete account actions', () => {
  test('Successful delete action is sended with correct payload', async () => {
    localStorage.setItem('id', '12');
    const store = mockStore({
      loginData: {
        name: 'TestName',
        googleId: '123456789',
        invalidData: false,
      },
      isLogged: true,
      errorMessage: '',
    });

    const expectedPayload = {
      loginData: {
        name: '',
        googleId: '',
        invalidData: false,
      },
      isLogged: false,
    };

    nock(`http://localhost/api`).delete(`/users/deleteAccount`).reply(200);

    const message = await store.dispatch(deleteAccount());

    expect(store.getActions()[0].type).toBe(logoutType);
    expect(store.getActions()[0].loginData).toEqual(expectedPayload.loginData);
    expect(store.getActions()[0].isLogged).toEqual(expectedPayload.isLogged);
    expect(message).toBe('Konto usunięte.');
  });

  test('Error is sended with correct payload', async () => {
    const store = mockStore({
      loginData: {
        name: 'TestName',
        googleId: '123456789',
        invalidData: false,
      },
      isLogged: true,
      errorMessage: '',
    });

    const expectedPayload = {
      loginData: {
        name: 'TestName',
        googleId: '123456789',
        invalidData: false,
      },
      isLogged: true,
      errorMessage: '',
    };

    nock(`http://localhost/api`).delete(`/users/deleteAccount`).reply(400);

    const message = await store.dispatch(deleteAccount());

    console.log(message);
    console.log();

    expect(store.getActions()[0]).toBe(undefined);
    expect(store.getState().loginData).toEqual(expectedPayload.loginData);
    expect(store.getState().isLogged).toEqual(expectedPayload.isLogged);
    expect(message).toBe(
      `Nie mogliśmy usunać Twojego konta. Spróbuj ponownie.`
    );
  });
});

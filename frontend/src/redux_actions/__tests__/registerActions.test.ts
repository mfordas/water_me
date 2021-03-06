import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import {
    resetRegisterState,
    postGoogleUser,
} from '../../redux_actions/registerActions';
import {
    registerExternal,
    resetRegState,
    RegisterState,
} from '../registerTypes';
import { AuthObject } from '../../Utils/generateAuthTokenForExternalUser';

const middlewares = [thunk];
const mockStore = configureStore<
  RegisterState,
  ThunkDispatch<RegisterState, any, any>
>(middlewares);

jest.mock('jwt-decode', () => () => ({}));
jest.mock('axios');

describe('Reset register state action', () => {
    const store = mockStore({
        invalidData: false,
        confirm: false,
        googleUser: false,
    });

    afterEach(() => {
        store.clearActions();
    });
    it('Actions is sended with correct payload', () => {
        const expectedPayload = {
            invalidData: false,
            confirm: false,
            googleUser: false,
        };

        store.dispatch(resetRegisterState());
        expect(store.getActions()[0].type).toBe(resetRegState);
        expect(store.getActions()[0].invalidData).toEqual(
            expectedPayload.invalidData
        );
        expect(store.getActions()[0].confirm).toEqual(expectedPayload.confirm);
        expect(store.getActions()[0].googleUser).toEqual(
            expectedPayload.googleUser
        );
    });
});

describe('Register actions', () => {
    test('Successful login action is sended with correct payload', async () => {
        (axios.post as jest.Mock).mockReturnValue(
            Promise.resolve({
                status: 200,
            })
        );

        const store = mockStore({
            invalidData: true,
            confirm: false,
            googleUser: false,
        });

        const expectedPayload = {
            invalidData: false,
            confirm: true,
            googleUser: true,
        };

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
        await store.dispatch(postGoogleUser(authTestObject));

        expect(store.getActions()[0].type).toBe(registerExternal);
        expect(store.getActions()[0].invalidData).toEqual(
            expectedPayload.invalidData
        );
        expect(store.getActions()[0].confirm).toEqual(expectedPayload.confirm);
        expect(store.getActions()[0].googleUser).toEqual(
            expectedPayload.googleUser
        );
    });

    test('Action is sended with correct payload', async () => {
        (axios.post as jest.Mock).mockReturnValue(
            Promise.resolve({
                status: 202,
            })
        );

        const store = mockStore({
            invalidData: false,
            confirm: true,
            googleUser: false,
        });

        const expectedPayload = {
            invalidData: true,
            confirm: false,
            googleUser: true,
        };

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
        await store.dispatch(postGoogleUser(authTestObject));

        expect(store.getActions()[0].type).toBe(registerExternal);
        expect(store.getActions()[0].invalidData).toEqual(
            expectedPayload.invalidData
        );
        expect(store.getActions()[0].confirm).toEqual(expectedPayload.confirm);
        expect(store.getActions()[0].googleUser).toEqual(
            expectedPayload.googleUser
        );
    });

    test('Error is sended with correct payload', async () => {
        (axios.post as jest.Mock).mockReturnValue(
            Promise.reject({
                status: 400,
                message: 'Error',
            })
        );

        const store = mockStore({
            invalidData: false,
            confirm: true,
            googleUser: false,
        });

        const expectedPayload = {
            invalidData: true,
            confirm: false,
            googleUser: true,
        };

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
        await store.dispatch(postGoogleUser(authTestObject));

        expect(store.getActions()[0].type).toBe(registerExternal);
        expect(store.getActions()[0].invalidData).toEqual(
            expectedPayload.invalidData
        );
        expect(store.getActions()[0].confirm).toEqual(expectedPayload.confirm);
        expect(store.getActions()[0].googleUser).toEqual(
            expectedPayload.googleUser
        );
    });
});

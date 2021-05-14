import axios from 'axios';
import jwt from 'jwt-decode';

import { loginExternalType, logoutType } from './loginTypes';
import { generateAuthTokenForExternalUser, 
    AuthObject,
} from '../Utils/generateAuthTokenForExternalUser';
import { AppThunk, AppThunkWithReturn } from '../redux_store/reduxStore';
import { setHeaders } from '../Utils/setHeaders';
import { apiUrl } from '../Utils/apiUrl';

export const loginExternal = (authObject: AuthObject): AppThunk => async (
    dispatch
) => {
    try {
        const res = await axios.post(`${apiUrl()}api/authexternal`, {
            token: await generateAuthTokenForExternalUser(authObject),
        });

        if (res.status === 200) {
            const token: string = res.headers['x-auth-token'];
            const id: string = jwt<{ id: string }>(token).id;
            localStorage.setItem('token', token);
            localStorage.setItem('id', id);
            localStorage.setItem('name', res.data.name);
            window.location.reload();
            dispatch({
                type: loginExternalType,
                loginData: {
                    name: res.data.name,
                    googleId: res.data.googleId,
                    invalidData: false,
                },
                isLogged: true,
            });
        } else if (res.status === 202) {
            dispatch({
                type: loginExternalType,
                isLogged: false,
            });
        }
    } catch (error) {
        console.error('Error Login:', error.message);
        dispatch({
            type: loginExternalType,
            loginData: {
                invalidData: true,
            },
            errorMessage: `${error.message}`,
        });
    }
};

export const logout = (): AppThunk => async (dispatch) => {
    localStorage.clear();
    window.location.reload();

    dispatch({
        type: logoutType,
        loginData: {
            name: '',
            googleId: '',
            invalidData: false,
        },
        isLogged: false,
    });
};

export const deleteAccount = (): AppThunkWithReturn => async (dispatch) => {
    try {
        const res = await axios.delete(`${apiUrl()}api/users/deleteAccount`, {
            headers: setHeaders(),
            data: {
                id: localStorage.getItem('id'),
            },
        });

        if (res.status === 200) {
            localStorage.clear();
            dispatch({
                type: logoutType,
                loginData: {
                    name: '',
                    googleId: '',
                    invalidData: false,
                },
                isLogged: false,
            });
            return 'Konto usunięte.';
        } else {
            throw Error(`Coś poszło nie tak: ${res.status}`);
        }
    } catch (error) {
        console.error(error.message);
        return 'Nie mogliśmy usunać Twojego konta. Spróbuj ponownie.';
    }
};

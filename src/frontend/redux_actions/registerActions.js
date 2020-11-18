import axios from 'axios';

import {
    TYPES
} from '../redux_actions/types';

import generateAuthTokenForExternalUser from '../Utils/generateAuthTokenForExternalUser';

export const postGoogleUser = (authObject) => async (dispatch) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/api/users/googleUser',
            data: {token: await generateAuthTokenForExternalUser(authObject)},
        });

        if (res.status === 200) {
            dispatch({
                type: TYPES.registerExternal,
                confirm: true,
                googleUser: true,
            });
        } else {
            dispatch({
                type: TYPES.registerExternal,
                invalidData: true,
                confirm: false,
                googleUser: true,
            });

        }
    } catch (error) {
        dispatch({
            type: TYPES.registerExternal,
            invalidData: true,
            confirm: false,
            googleUser: true,
        });
        console.error('Error Registration:', error);
    }
};

export const resetRegisterState = () => async (dispatch) => {
    return dispatch({
        type: TYPES.resetRegisterState,
        invalidData: false,
        confirm: false,
        googleUser: false,
    })
};
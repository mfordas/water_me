import {
    TYPES
} from '../redux_actions/types';

const initialState = {
    invalidData: false,
    confirm: false,
    googleUser: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPES.registerExternal:
            return {
                ...state,
                confirm: action.confirm,
                    invalidData: action.invalidData,
                    googleUser: action.googleUser,
            };
        case TYPES.resetRegisterState:
            return {
                ...state,
                confirm: action.confirm,
                    invalidData: action.invalidData,
                    googleUser: action.googleUser,
            }
            default:
                return state;
    }
}
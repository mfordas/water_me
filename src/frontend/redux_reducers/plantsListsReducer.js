import {
    TYPES
} from '../redux_actions/types';

const initialState = {
    plantsListName: '',
    plantsLists: [],
    userId: localStorage.getItem('id'),
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPES.addPlantsList:
            return {
                ...state,
                plantsListName: action.plantsListName,
            };
        case TYPES.getPlantsLists:
            return {
                ...state,
                plantsLists: action.plantsLists,
            }
            default:
                return state;
    }
}
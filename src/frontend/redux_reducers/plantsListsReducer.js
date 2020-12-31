import { TYPES } from '../redux_actions/types';

const initialState = {
  plantsListName: '',
  plantsLists: [],
  userId: localStorage.getItem('id'),
  plantsListDeleted: false,
  plants: [],
};

const plantsListReducer = function (state = initialState, action) {
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
      };
    case TYPES.deletePlantsList:
      return {
        ...state,
        plantsListDeleted: action.plantsListDeleted,
      };
    case TYPES.showPlantsList:
      return {
        ...state,
        plants: action.plants,
      };
    default:
      return state;
  }
};

export default plantsListReducer;

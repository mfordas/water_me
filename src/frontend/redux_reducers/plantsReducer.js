import { TYPES } from '../redux_actions/types';

const initialState = {
  plantData: {},
  plantDeleted: false,
  wateringDateUpdated: false,
  imageName: '',
};

const plantsReducer = function (state = initialState, action) {
  switch (action.type) {
    case TYPES.addPlant:
      return {
        ...state,
        plantData: action.plantData,
      };
    case TYPES.deletePlant:
      return {
        ...state,
        plantDeleted: action.plantDeleted,
      };
    case TYPES.updateLastWateringDate:
      return {
        ...state,
        wateringDateUpdated: action.wateringDateUpdated,
      };
    case TYPES.uploadImage:
      return {
        ...state,
        imageName: action.imageName,
      };
    default:
      return state;
  }
};

export default plantsReducer;

import {
  addPlantType,
  deletePlantType,
  updateLastWateringDateType,
  uploadImageType,
  PlantsState,
  PlantsActionsType,
} from '../redux_actions/plantsTypes';

export const initialState: PlantsState = {
  plantData: {},
  plantDeleted: false,
  wateringDateUpdated: false,
  imageName: '',
};

export const plantsReducer = function (
  state = initialState,
  action: PlantsActionsType
): PlantsState {
  switch (action.type) {
    case addPlantType:
      return {
        ...state,
        plantData: action.plantData,
      };
    case deletePlantType:
      return {
        ...state,
        plantDeleted: action.plantDeleted,
      };
    case updateLastWateringDateType:
      return {
        ...state,
        wateringDateUpdated: action.wateringDateUpdated,
      };
    case uploadImageType:
      return {
        ...state,
        imageName: action.imageName,
      };
    default:
      return state;
  }
};

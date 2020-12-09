import { TYPES } from "../redux_actions/types";

const initialState = {
  plantData: {},
  plantDeleted: false,
  wateringDateUpdated: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.addPlant:
      return {
        ...state,
        plantData: action.plantData
      };
    case TYPES.deletePlant:
      return {
        ...state,
        plantDeleted: action.plantDeleted
      };
    case TYPES.updateLastWateringDate:
      return {
        ...state,
        wateringDateUpdated: action.wateringDateUpdated
      };
    default:
      return state;
  }
}

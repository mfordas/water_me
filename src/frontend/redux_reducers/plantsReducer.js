import { TYPES } from "../redux_actions/types";

const initialState = {
  plantData: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.addPlant:
      return {
        ...state,
        plantData: action.plantData
      };
    default:
      return state;
  }
}

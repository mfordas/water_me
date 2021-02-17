import {
  addPlantsListType,
  getPlantsListsType,
  deletePlantsListType,
  showPlantsListType,
  PlantsListsState,
  PlantsListsActionType,
} from '../redux_actions/plantsListsTypes';

export const initialState: PlantsListsState = {
  plantsListName: '',
  plantsLists: [],
  userId: localStorage.getItem('id'),
  plantsListDeleted: false,
  plants: [],
};

const plantsListReducer = function (
  state = initialState,
  action: PlantsListsActionType
): PlantsListsState {
  switch (action.type) {
    case addPlantsListType:
      return {
        ...state,
        plantsListName: action.plantsListName,
      };
    case getPlantsListsType:
      return {
        ...state,
        plantsLists: action.plantsLists,
      };
    case deletePlantsListType:
      return {
        ...state,
        plantsListDeleted: action.plantsListDeleted,
      };
    case showPlantsListType:
      return {
        ...state,
        plants: action.plants,
      };
    default:
      return state;
  }
};

export default plantsListReducer;

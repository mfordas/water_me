import { Plant } from './plantsTypes';

export const addPlantsListType = 'addPlantsList';
export const getPlantsListsType = 'getPlantsLists';
export const deletePlantsListType = 'deletePlantsList';
export const showPlantsListType = 'showPlantsList';

export type PlantsList = {
  id: number;
  userId: number;
  name: string;
};

export interface PlantsState {
  plantsListName: string;
  plantsLists: PlantsList[] | [];
  userId: string | null;
  plantsListDeleted: boolean;
  plants: Plant[] | [];
}

interface AddPlantsListAction extends PlantsState {
  type: typeof addPlantsListType;
}
interface GetPlantsListAction extends PlantsState {
  type: typeof getPlantsListsType;
}
interface DeletePlantsListAction extends PlantsState {
  type: typeof deletePlantsListType;
}
interface ShowPlantsListAction extends PlantsState {
  type: typeof showPlantsListType;
}

export type PlantsListsActionType =
  | AddPlantsListAction
  | GetPlantsListAction
  | DeletePlantsListAction
  | ShowPlantsListAction;

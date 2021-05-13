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

export interface PlantsListsState {
  	plantsListName: string;
  	plantsLists: PlantsList[];
  	userId: string | null;
	plantsListDeleted: boolean;
  	plants: Plant[];
}

interface AddPlantsListAction extends PlantsListsState {
	type: typeof addPlantsListType;
}
interface GetPlantsListAction extends PlantsListsState {
	type: typeof getPlantsListsType;
}
interface DeletePlantsListAction extends PlantsListsState {
	type: typeof deletePlantsListType;
}
interface ShowPlantsListAction extends PlantsListsState {
	type: typeof showPlantsListType;
}

export type PlantsListsActionType =
  | AddPlantsListAction
  | GetPlantsListAction
  | DeletePlantsListAction
  | ShowPlantsListAction;

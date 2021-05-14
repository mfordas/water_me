export const addPlantType = 'addPlant';
export const deletePlantType = 'deletePlant';
export const updateLastWateringDateType = 'updateLastWateringDate';
export const uploadImageType = 'uploadImage';

export type Plant = {
  id: number;
  name: string;
  plantsListId: number;
  wateringCycle: number;
  pictureUrl: string;
  wateringCycleBeginingData: Date;
  lastTimeWatered: Date;
};

export interface PlantsState {
  plantData: Plant | {};
  plantDeleted: boolean;
  wateringDateUpdated: boolean;
  imageName: string;
}

interface AddPlantAction extends PlantsState {
  type: typeof addPlantType;
}

interface DeletePlantAction extends PlantsState {
  type: typeof deletePlantType;
}

interface UpdateLastWateringDateAction extends PlantsState {
  type: typeof updateLastWateringDateType;
}

interface UploadImageAction extends PlantsState {
  type: typeof uploadImageType;
}

export type PlantsActionsType =
  | AddPlantAction
  | DeletePlantAction
  | UpdateLastWateringDateAction
  | UploadImageAction;

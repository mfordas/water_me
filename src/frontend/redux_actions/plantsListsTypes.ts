export const addPlantsList = 'addPlantsList';
export const getPlantsLists = 'getPlantsLists';
export const deletePlantsList = 'deletePlantsList';
export const showPlantsList = 'showPlantsList';

export interface PlantsState = {
  plantsListName: '',
  plantsLists: [],
  userId: localStorage.getItem('id'),
  plantsListDeleted: false,
  plants: [],
};

import fs from 'fs';

import { PlantInstance, Plant } from '../../models/Plant.js';
import { PlantsListInstance, PlantsList } from '../../models/PlantsList.js';
import { uploadFolder } from '../plants.js';

export const findPlantsLists = async (
  userId: number
): Promise<PlantsListInstance[]> => {
  return await PlantsList.findAll({
    where: {
      userId: userId,
    },
  });
};

export const findPlants = async (
  plantsListId: number
): Promise<PlantInstance[]> => {
  return await Plant.findAll({
    where: {
      plantsListId: plantsListId,
    },
  });
};

export const deletePlants = async (
  plants: PlantInstance[]
): Promise<number> => {
  return await Plant.destroy({
    where: { id: [...plants.map((plant) => plant.id)] },
  });
};

export const deletePlantsLists = async (
  plantsLists: PlantsListInstance[]
): Promise<number> => {
  return await PlantsList.destroy({
    where: {
      id: [...plantsLists.map((plantsList) => plantsList.id)],
    },
  });
};

export const deletePlantPicture = (plant: PlantInstance) => {
  fs.rm(`${uploadFolder}/${plant.pictureUrl}.png`, () =>
    console.log(`File ${plant.pictureUrl}.png removed`)
  );
};

export const removePlantsListWithAllPlants = async (
  plantsListId: number
): Promise<number> => {
  const plants = await findPlants(plantsListId);
  plants.map((plant) => deletePlantPicture(plant));
  return await deletePlants(plants);
};

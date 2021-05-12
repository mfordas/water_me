import express, { Request, Response } from 'express';

import { auth } from '../middleware/authorization.js';
import { PlantsList } from '../models/PlantsList.js';
import { removePlantsListWithAllPlants } from './utils/deleteAccountUtils.js';

export const router = express.Router();

const getAllPlantsListsFromDB = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const plantsLists = await res.locals.models.PlantsList.findAll();

    return res.status(200).send(plantsLists);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

router.get('/', auth, getAllPlantsListsFromDB);

const addPlantsListToDB = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const plantsListData = req.body;

  try {
    const plantsList = await PlantsList.create(plantsListData);

    return res.status(200).send(plantsList);
  } catch (err) {
    console.log(err);

    return res.send(err);
  }
};

router.post('/', auth, addPlantsListToDB);

const getPlantsListsForUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const plantsLists = await PlantsList.findAll({
      where: {
        userId: req.params.userId,
      },
    });

    return plantsLists.length > 0
      ? res.status(200).send(plantsLists)
      : res.status(404).send('Plants lists not found');
  } catch (err) {
    console.log(new Error(err));
    return res.send(err);
  }
};

router.get('/:userId', auth, getPlantsListsForUser);

const deletePlantsList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (req.params.userId === req.body.userId) {
    try {
      await PlantsList.destroy({
        where: {
          id: req.params.plantsListId,
          userId: req.params.userId,
        },
      });

      await removePlantsListWithAllPlants(parseInt(req.params.plantsListId));

      return res.status(200).send('Plants list with all plants deleted');
    } catch (err) {
      console.log(new Error(err));
      return res.send(err);
    }
  } else {
    return res.status(401).send('You are not allowed to do that');
  }
};

router.delete('/:userId/:plantsListId', auth, deletePlantsList);

const showPlantsList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (req.params.userId === req.body.userId) {
    try {
      const plantsList = await PlantsList.findOne({
        where: {
          id: req.params.plantsListId,
          userId: req.params.userId,
        },
      });

      return plantsList
        ? res.status(200).send(plantsList)
        : res.status(404).send('List not found');
    } catch (err) {
      console.log(new Error(err));
      return res.send(err);
    }
  } else {
    return res.status(401).send('You are not allowed to do that');
  }
};

router.get('/:userId/:plantsListId', auth, showPlantsList);

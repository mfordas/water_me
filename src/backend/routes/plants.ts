import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

import auth from '../middleware/authorization.js';
import fileUpload from '../middleware/fileUpload.js';
import resizeImage from '../Utils/resizeImage.js';
import { Plant } from '../models/Plant.js';

interface IUserBodyForPlantsRoutes extends Request {
  user: {
    id: string;
  };
}

const __dirname = path.resolve();

const router = express.Router();

const uploadFolder =
  process.env.NODE_ENV === 'production'
    ? process.env.IMAGES_UPLOAD_PATH_PROD
    : process.env.IMAGES_UPLOAD_PATH_DEV;

const getAllPlantsFromDB = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const plantsList = await res.locals.models.Plant.findAll();

    res.send(plantsList);
  } catch (err) {
    console.log(err);
  }
};

router.get('/', auth, getAllPlantsFromDB);

const plantImageUpload = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!uploadFolder) return res.status(404).send('Picture folder not found');

  const imagePath = path.join(__dirname, uploadFolder);

  if (!req.file) {
    return res.status(401).json({ error: 'Please provide an image' });
  }

  const fileName = await resizeImage(req.file.buffer, imagePath);

  return res.status(200).send(fileName);
};

router.post('/image', auth, fileUpload.single('image'), plantImageUpload);

const addPlantToDB = async (req: Request, res: Response): Promise<Response> => {
  const plantData = {
    ...req.body,
    plantsListId: req.params.plantsListId,
  };

  try {
    const plant = await Plant.create(plantData);

    return res.status(200).send(plant);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

router.post('/:plantsListId', auth, addPlantToDB);

const findAllPlantsFromPlantsList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const requestWithType = req as IUserBodyForPlantsRoutes;

  if (req.params.userId === requestWithType.user.id.toString()) {
    try {
      const plants = await Plant.findAll({
        where: {
          plantsListId: req.params.plantsListId,
        },
      });

      return res.status(200).send(plants);
    } catch (err) {
      console.log(new Error(err));
      return res.status(404).send(err);
    }
  } else {
    return res.status(401).send('You are not allowed to do that');
  }
};

router.get('/:userId/:plantsListId', auth, findAllPlantsFromPlantsList);

const deletePlant = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const requestWithType = req as IUserBodyForPlantsRoutes;

  if (req.params.userId === requestWithType.user.id.toString()) {
    try {
      const plant = await Plant.findOne({
        where: {
          id: req.params.plantId,
        },
      });

      if (plant) {
        await Plant.destroy({
          where: {
            id: req.params.plantId,
          },
        });

        fs.rm(`${uploadFolder}/${plant.pictureUrl}.png`, () =>
          console.log(`File ${plant.pictureUrl}.png removed`)
        );

        return res.status(200).send(`${plant.name} deleted`);
      }

      if (!plant) return res.status(404).send('Plant not found');
    } catch (err) {
      console.log(new Error(err));
      return res.send(err);
    }
  } else {
    return res.status(401).send('You are not allowed to do that');
  }
};

router.delete('/:userId/:plantId', auth, deletePlant);

const updateLastWateringDate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const requestWithType = req as IUserBodyForPlantsRoutes;

  if (req.params.userId === requestWithType.user.id.toString()) {
    try {
      await Plant.update(
        { lastTimeWatered: req.body.lastTimeWatered },
        {
          where: {
            id: req.params.plantId,
          },
        }
      );

      const plant = await Plant.findOne({
        where: {
          id: req.params.plantId,
        },
      });

      return res.status(200).send(plant);
    } catch (err) {
      console.log(new Error(err));
      return res.send(err);
    }
  } else {
    return res.status(401).send('You are not allowed to do that');
  }
};

router.patch('/:userId/:plantId', auth, updateLastWateringDate);

export default router;

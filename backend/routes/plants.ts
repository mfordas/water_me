import express, { Request, Response } from 'express';
import path from 'path';

import { auth } from '../middleware/authorization';
import { fileUpload } from '../middleware/fileUpload';
import { resizeImage } from '../Utils/resizeImage';
import { Plant } from '../models/Plant';
import { deletePlantPicture } from './utils/deleteAccountUtils';

interface IUserBodyForPlantsRoutes extends Request {
  user: {
    id: string;
  };
}

export const router = express.Router();

export const uploadFolder =
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

    const imagePath = path.join(uploadFolder);

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

                deletePlantPicture(plant);

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

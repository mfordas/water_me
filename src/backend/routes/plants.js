import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import auth from '../middleware/authorization.js';
import fileUpload from '../middleware/fileUpload.js';
import resizeImage from '../Utils/resizeImage.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();

const getAllPlantsFromDB = async (req, res) => {
    try {
    const plantsList = await res.locals.models.Plant.findAll();
    
    res.send(plantsList);
    } catch (err) {
        console.log(err);
    }
}

router.get('/', auth, getAllPlantsFromDB);

const addPlantToDB = async (req, res) => {
    const Plant = await res.locals.models.Plant;

    const plantData = {
        ...req.body,
        plantsListId: req.params.plantsListId
    };

    try {

        const plant = await Plant.create(plantData);

        res.status(200).send(plant)

    } catch (err) {

        console.log(err);
    }
};

router.post('/:plantsListId', auth, addPlantToDB);

const findAllPlantsFromPlantsList = async (req, res) => {
    const Plant = await res.locals.models.Plant;

    if (req.params.userId === req.user.id.toString()) {

        try {
            const plants = await Plant.findAll({
                where: {
                    plantsListId: req.params.plantsListId,
                }
            });

            res.status(200).send(plants);

        } catch (err) {
            console.log(new Error(err));
            
        };
    } else {
        res.status(401).send('You are not allowed to do that');
    }
}

router.get('/:userId/:plantsListId', auth, findAllPlantsFromPlantsList);

const deletePlant = async (req, res) => {
    const Plant = await res.locals.models.Plant;

    if (req.params.userId === req.user.id.toString()) {

        try {
            const plant = await Plant.findOne({
                where: {
                    id: req.params.plantId,
                }
            });

            await Plant.destroy({
                where: {
                    id: req.params.plantId,
                }
            });

            res.status(200).send(`${plant.name} deleted`);

        } catch (err) {
            console.log(new Error(err));
            
        };
    } else {
        res.status(401).send('You are not allowed to do that');
    }
}

router.delete('/:userId/:plantId', auth, deletePlant);

const updateLastWateringDate = async (req, res) => {
    const Plant = await res.locals.models.Plant;

    if (req.params.userId === req.user.id.toString()) {

        try {
            await Plant.update({ lastTimeWatered: req.body.lastTimeWatered }, {
                where: {
                    id: req.params.plantId,
                }
            });

            const plant = await Plant.findOne({
                where: {
                    id: req.params.plantId,
                }
            });

            res.status(200).send(plant);

        } catch (err) {
            console.log(new Error(err));
            
        };
    } else {
        res.status(401).send('You are not allowed to do that');
    }
}

router.patch('/:userId/:plantId', auth, updateLastWateringDate);

const plantImageUpload = async (req, res) => {
    const imagePath = path.join(__dirname, '/public/images');
    if (!req.file) {
      res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await resizeImage(req.file.buffer, imagePath);
    return res.status(200).json({ name: filename });
};

router.post('/image/:plantId', auth, fileUpload.single('image'), plantImageUpload)


export default router;
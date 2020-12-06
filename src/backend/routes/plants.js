import express from 'express';
import auth from '../middleware/authorization.js';

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

    const plantData = req.body;

    try {

        const plant = await Plant.create(plantData);

        res.status(200).send(plant)

    } catch (err) {

        console.log(err);
    }
};

router.post('/', auth, addPlantToDB);

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

export default router;
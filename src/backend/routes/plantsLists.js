import express from 'express';
import auth from '../middleware/authorization.js';

const router = express.Router();

const getAllPlantsListsFromDB = async (req, res) => {
    try {
        const plantsLists = await res.locals.models.PlantsList.findAll();

        res.send(plantsLists);
    } catch (err) {
        console.log(err);
    }
}

router.get('/', auth, getAllPlantsListsFromDB);

const addPlantsListToDB = async (req, res) => {
    const PlantsList = await res.locals.models.PlantsList;

    const plantsListData = req.body;

    try {

        const plantsList = await PlantsList.create(plantsListData);

        res.status(200).send(plantsList)

    } catch (err) {

        console.log(err);
    }
};

router.post('/', auth, addPlantsListToDB);

const getPlantsListsForUser = async (req, res) => {
    const PlantsList = await res.locals.models.PlantsList;

    try {

        const plantsLists = await PlantsList.findAll({
            where: {
                userId: req.params.userId
            }
        });

        plantsLists.length > 0 ? res.status(200).send(plantsLists) : res.status(404).send('Plants lists not found');

    } catch (err) {
        console.log(new Error(err));
    }
};

router.get('/:userId', auth, getPlantsListsForUser);

const deletePlantsList = async (req, res) => {
    const PlantsList = await res.locals.models.PlantsList;

    if (req.params.userId === req.body.userId) {

        try {
            await PlantsList.destroy({
                where: {
                    id: req.params.plantsListId,
                    userId: req.params.userId,
                }
            });

            res.status(200).send('Plants list deleted');

        } catch (err) {
            console.log(new Error(err));
            
        };
    } else {
        res.status(401).send('You are not allowed to do that');
    }
}

router.delete('/:userId/:plantsListId', auth, deletePlantsList);

const showPlantsList = async (req, res) => {
    const PlantsList = await res.locals.models.PlantsList;

    if (req.params.userId === req.body.userId) {

        try {
            const plantsList = await PlantsList.findOne({
                where: {
                    id: req.params.plantsListId,
                    userId: req.params.userId,
                }
            });

            plantsList ? res.status(200).send(plantsList) : res.status(404).send('List not found');

        } catch (err) {
            console.log(new Error(err));
            
        };
    } else {
        res.status(401).send('You are not allowed to do that');
    }
}

router.get('/:userId/:plantsListId', auth, showPlantsList);

export default router;
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

router.get('/:userId',auth, getPlantsListsForUser);

export default router;
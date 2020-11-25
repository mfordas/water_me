import express from 'express';

const router = express.Router();

const getAllPlantsFromDB = async (req, res) => {
    try {
    const plantsList = await res.locals.models.Plant.findAll();
    
    res.send(plantsList);
    } catch (err) {
        console.log(err);
    }
}

router.get('/', getAllPlantsFromDB);

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

router.post('/', addPlantToDB);

export default router;
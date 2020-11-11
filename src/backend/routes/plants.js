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

export default router;
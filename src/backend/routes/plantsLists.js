import express from 'express';

const router = express.Router();

const getAllPlantsListsFromDB = async (req, res) => {
    try {
    const plantsLists = await res.locals.models.PlantList.findAll();
    
    res.send(plantsLists);
    } catch (err) {
        console.log(err);
    }
}

router.get('/', getAllPlantsListsFromDB);

export default router;
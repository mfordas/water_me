import express from 'express';

const router = express.Router();

const getAllUsersFromDB = async (req, res) => {
    try {
    const usersList = await res.locals.models.User.findAll();
    
    res.send(usersList);
    } catch (err) {
        console.log(err);
    }
}

router.get('/', getAllUsersFromDB);

export default router;
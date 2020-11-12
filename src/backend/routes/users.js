import express from 'express';

const router = express.Router();

const getAllUsersFromDB = async (req, res) => {
    try {
        const usersList = await res.locals.models.User.findAll();

        res.send(usersList);
    } catch (err) {
        console.log(err);
    }
};

router.get('/', getAllUsersFromDB);

const addUserToDB = async (req, res) => {
    const User = await res.locals.models.User;

    console.log(req.body);

    const userData = req.body;

    try {

        const user = await User.create(userData);

        res.status(200).send(user)

    } catch (err) {

        console.log(err);
    }
};

router.post('/', addUserToDB);

export default router;
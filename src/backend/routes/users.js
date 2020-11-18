import express from 'express';

import verify from '../Utils/googleAuth.js';
import generateAuthToken from '../Utils/generateAuthToken.js';
import auth from '../middleware/authorization.js';

const router = express.Router();

const getAllUsersFromDB = async (req, res) => {
    try {
        const usersList = await res.locals.models.User.findAll();

        res.send(usersList);
    } catch (err) {
        console.log(err);
    }
};

router.get('/', auth, getAllUsersFromDB);

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

const registerNewGoogleUser = async (req, res) => {
    const User = await res.locals.models.User;

    const verificationResult = await verify(req.body);

    if (verificationResult instanceof Error) return res.status(401).send(console.error(verificationResult));

    let user = await res.locals.models.User.findOne({
        where: {
            googleId: verificationResult.sub
        }
    });

    if (user) return res.status(400).send(new Error('User already registered'));

    const newUser = {
        googleId: verificationResult.sub,
        name: verificationResult.given_name,
        plantsTable: null
    };

    if (!newUser) return res.status(400).send(new Error("Wrong user's data"));

    user = await User.create(newUser);

    const token = generateAuthToken(user);

    return res
        .status(200)
        .header("x-auth-token", token)
        .send(user);
};

router.post("/googleUser", registerNewGoogleUser);

export default router;
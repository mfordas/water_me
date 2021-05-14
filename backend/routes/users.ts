import express, { Request, Response } from 'express';

import { verify } from '../Utils/googleAuth';
import { generateAuthToken } from '../Utils/generateAuthToken';
import { auth } from '../middleware/authorization';
import { User } from '../models/User';
import {
    findPlantsLists,
    deletePlantsLists,
    removePlantsListWithAllPlants,
} from './utils/deleteAccountUtils';

export const router = express.Router();

const getAllUsersFromDB = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const usersList = await User.findAll();

        return res.send(usersList);
    } catch (err) {
        console.log(err);
        return res.send(err);
    }
};

router.get('/', auth, getAllUsersFromDB);

const addUserToDB = async (req: Request, res: Response): Promise<Response> => {
    const userData = req.body;

    try {
        const user = await User.create(userData);

        return res.status(200).send(user);
    } catch (err) {
        console.log(err);
        return res.send(err);
    }
};

router.post('/', addUserToDB);

const registerNewGoogleUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const verificationResult = await verify(req.body);

    if (verificationResult instanceof Error)
        return res.status(401).send(console.error(verificationResult));

    let user = await User.findOne({
        where: {
            googleId: verificationResult.sub,
        },
    });

    if (user) return res.status(400).send(new Error('User already registered'));

    const newUser = {
        googleId: verificationResult.sub,
        name: verificationResult.given_name || 'default name',
        plantsTable: null,
    };

    if (!newUser) return res.status(400).send(new Error('Wrong user\'s data'));

    user = await User.create(newUser);

    const token = generateAuthToken(user);

    if (token) {
        return res.status(200).header('x-auth-token', token).send(user);
    } else {
        return res.status(404).send('JWT Problem');
    }
};

router.post('/googleUser', registerNewGoogleUser);

const deleteAccount = async (
    req: Request,
    res: Response
): Promise<Response | undefined> => {
    const user = await User.findOne({ where: { id: req.body.id } });

    if (!user) return res.status(404).send(new Error('User not found'));

    const plantsLists = await findPlantsLists(user.id);

    const deletedPlantsRowsArray = await Promise.all(
        plantsLists.map(async (plantsList) => {
            return await removePlantsListWithAllPlants(plantsList.id);
        })
    );

    const numberOfDeletedPlants =
    deletedPlantsRowsArray.length > 0
        ? deletedPlantsRowsArray.reduce(
            (prevValue, currentValue) => prevValue + currentValue
        )
        : 0;

    const deletedPlantsListsRows = await deletePlantsLists(plantsLists);

    const deletedUsers = await User.destroy({
        where: { googleId: user.googleId },
    });

    console.info(
        `Deleted: ${numberOfDeletedPlants} plants, ${deletedPlantsListsRows} plants lists, ${deletedUsers} user`
    );

    return res.status(200).send('Account deleted');
};

router.delete('/deleteAccount', deleteAccount);

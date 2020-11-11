import sequelize from 'sequelize';
import dotenv from 'dotenv';

import {
    User
} from '../models/User.js';
import {
    Plant
} from '../models/Plant.js';
import {
    PlantList
} from '../models/PlantsList.js';

dotenv.config();

export const createDatabase = async () => {
    try {
        const dbHost = process.env.DB_HOST_DEV;

        const databaseInitialization = new sequelize.Sequelize('', process.env.DB_USER_DEV, process.env.DB_PASS_DEV, {
            host: dbHost,
            dialect: 'mysql'
        });

        await databaseInitialization.query(`CREATE DATABASE ${process.env.DB_NAME_DEV};`);

        return databaseInitialization;

    } catch (err) {

        console.log(err)
    }

};

export const createTables = async (dbConnection) => {
    const userModel = User;
    const plantModel = Plant;
    const plantListModel = PlantList;

    await dbConnection.sync({
    });

    console.log(userModel === dbConnection.models.User);
    console.log(plantModel === dbConnection.models.Plant);
    console.log(plantListModel === dbConnection.models.PlantList);

};
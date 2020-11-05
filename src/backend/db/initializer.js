import sequelize from 'sequelize';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

import {
    createUsersModel
} from '../models/users.js';
import {
    createPlantsModel
} from '../models/plants.js';
import {
    createPlantsListsModel
} from '../models/plantsLists.js';

dotenv.config();

const hashPassword = async password =>
    await bcrypt.hash(password, await bcrypt.genSalt(10));


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
    const userModel = createUsersModel(dbConnection);
    const plantModel = createPlantsModel(dbConnection);
    const plantListModel = createPlantsListsModel(dbConnection);

    await dbConnection.sync({
        force: true
    });

    console.log(userModel === dbConnection.models.User);
    console.log(plantModel === dbConnection.models.Plant);
    console.log(plantListModel === dbConnection.models.PlantList);

};
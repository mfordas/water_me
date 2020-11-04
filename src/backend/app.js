import sequelize from 'sequelize';
import express from 'express';

import dbConnect from './db/connection.js';
import { createUsersModel } from './models/users.js';
import { createPlantsModel } from './models/plants.js';
import { createPlantsListsModel } from './models/plantsLists.js';

const app = express();

const runApp = async () => {
    const dbConnection = await dbConnect();
    
    const userModel = createUsersModel(dbConnection);
    const plantModel = createPlantsModel(dbConnection);
    const plantListModel = createPlantsListsModel(dbConnection);

    await dbConnection.sync({ force: true });

    console.log(userModel === dbConnection.models.User);
    console.log(plantModel === dbConnection.models.Plant);
    console.log(plantListModel === dbConnection.models.PlantList);

    app.listen(3000, () =>
        console.log(`Listening on port 3000`));

};

runApp();
import express from 'express';

import { dbConnection, register, models } from './db/index.js';
import {
    createDatabase,
    createTables
} from './db/initializer.js';
import users from './routes/users.js';
import mainPage from './routes/mainPage.js';
import plants from './routes/plants.js';
import plantsLists from './routes/plantsLists.js';

const app = express();

const connectToDB = async () => {
    await dbConnection.authenticate();

    console.log(`Connected to ${dbConnection.config.database}`);

    return dbConnection;
}

const runApp = async () => {
    const activeDbConnection = await connectToDB();

    if (process.env.NODE_ENV === 'test') {
        activeDbConnection.drop();
        await createDatabase();
        await createTables(dbConnection);
    };

    register(app, dbConnection, models);
        
    app.use('/', mainPage);
    app.use('/users', users);
    app.use('/plants', plants);
    app.use('/plantsLists', plantsLists);
    
    app.listen(3000, () =>
        console.log(`Listening on port 3000`));

};

runApp();
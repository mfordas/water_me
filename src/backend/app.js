import express from 'express';

import { dbConnection, register, models } from './db/index.js';
import {
    createDatabase,
    createTables
} from './db/initializer.js';

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
        
    app.get('/', (req, res ) => res.send('Main page'))
    app.get('/users', async (req, res) => {
        console.log(res.locals.models);
        res.send(await res.locals.models.User.findAll());
    })
    
    app.listen(3000, () =>
        console.log(`Listening on port 3000`));

};

runApp();
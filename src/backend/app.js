import express from 'express';

import dbConnect from './db/connection.js';
import {
    createDatabase,
    createTables
} from './db/initializer.js';

const app = express();

const runApp = async () => {

    let dbConnection;

    if (process.env.NODE_ENV === 'test') {
        await createDatabase();

        dbConnection = await dbConnect();

        await createTables(dbConnection);

        
    } else {
        
        dbConnection = await dbConnect();
        
        await createTables(dbConnection);
        
    }
    console.log(dbConnection.models);
    
    app.listen(3000, () =>
        console.log(`Listening on port 3000`));

};

runApp();
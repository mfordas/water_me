import express from 'express';

import dbConnect from './db/connection.js';
import { createDatabase, createTables } from './db/initializer.js';

const app = express();

const runApp = async () => {

    if(process.env.NODE_ENV === 'test') {
        await createDatabase();

        const dbConnection = await dbConnect();

        await createTables( dbConnection );
        
    } else {

        await dbConnect();

    }

    

    app.listen(3000, () =>
        console.log(`Listening on port 3000`));

};

runApp();
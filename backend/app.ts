import express from 'express';
import path from 'path';
import helmet from 'helmet';
import fs from 'fs';
import cors from 'cors';

import {
  connectToDB,
  mainSeqelizeInstation,
  register,
  models,
} from './db/index.js';
import { createDatabase, createTables } from './db/initializer.js';
import users from './routes/users.js';
import mainPage from './routes/mainPage.js';
import plants from './routes/plants.js';
import plantsLists from './routes/plantsLists.js';
import authExternal from './routes/authExternal.js';
import { Sequelize } from 'sequelize';

const app = express();

const dbInitialization = async (app: express.Express, models: any) => {
  if (mainSeqelizeInstation instanceof Sequelize) {
    let activeDbConnection: Sequelize | Error;

    activeDbConnection = await connectToDB(mainSeqelizeInstation);

    if (activeDbConnection instanceof Sequelize) {
      await createTables(mainSeqelizeInstation);
      register(app, activeDbConnection, models);
    } else if (activeDbConnection instanceof Error) {
      await createDatabase();
      await createTables(mainSeqelizeInstation);
      register(app, mainSeqelizeInstation, models);
    }
  }

  return mainSeqelizeInstation;
};

const runApp = async () => {
  app.use(
    cors({
      origin: 'http://localhost:3000',
      allowedHeaders: ['x-auth-token', 'content-type'],
      exposedHeaders: ['x-auth-token', 'content-type'],
    })
  );
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  await dbInitialization(app, models);

  const dirname = path.resolve();

  if (!fs.existsSync(path.join(dirname, '/images'))) {
    fs.mkdir(path.join(dirname, '/images'), () => {
      console.log('Images folder created');
    });
  }

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(express.static('images'));
  app.use('/', mainPage);
  app.use('/api/users', users);
  app.use('/api/plants', plants);
  app.use('/api/plantsLists', plantsLists);
  app.use('/api/authexternal', authExternal);

  app.get('*', function (req, res) {
    res.sendFile(path.join(dirname + '/images/' + `${req.path.split('/')[3]}`));
  });

  const port = process.env.PORT || 8080;

  app.listen(port, () => console.log(`Listening on port ${port}`));
};

runApp();

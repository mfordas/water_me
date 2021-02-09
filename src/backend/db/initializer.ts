import sequelize, { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import { User } from '../models/User.js';
import { Plant } from '../models/Plant.js';
import { PlantsList } from '../models/PlantsList.js';

dotenv.config();

export const createDatabase = async (): Promise<Sequelize> => {
  const dbHost =
    process.env.NODE_ENV === 'production'
      ? process.env.DB_HOST
      : process.env.DB_HOST_DEV;
  const dbUser =
    process.env.NODE_ENV === 'production'
      ? process.env.DB_USER
      : process.env.DB_USER_DEV;
  const dbPassword =
    process.env.NODE_ENV === 'production'
      ? process.env.DB_PASS
      : process.env.DB_PASS_DEV;
  const dbName =
    process.env.NODE_ENV === 'production'
      ? process.env.DB_NAME
      : process.env.DB_NAME_DEV;

  if (dbHost && dbUser && dbPassword && dbName) {
    const databaseInitialization = new sequelize.Sequelize(
      '',
      dbUser,
      dbPassword,
      {
        host: dbHost,
        dialect: 'mysql',
      }
    );

    await databaseInitialization.query(`CREATE DATABASE ${dbName};`);

    return databaseInitialization;
  } else {
    const databaseInitialization = new sequelize.Sequelize(
      '',
      'testUser',
      'testPassword',
      {
        host: 'localHost',
        dialect: 'mysql',
      }
    );

    await databaseInitialization.query(`CREATE DATABASE ${dbName};`);

    return databaseInitialization;
  }
};

export const createTables = async (dbConnection: Sequelize): Promise<void> => {
  const userModel = User;
  const plantModel = Plant;
  const plantListModel = PlantsList;

  await dbConnection.sync({});

  console.log(userModel === dbConnection.models.User);
  console.log(plantModel === dbConnection.models.Plant);
  console.log(plantListModel === dbConnection.models.PlantsList);
};

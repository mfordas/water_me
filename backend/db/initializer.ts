import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import { User } from '../models/User.js';
import { Plant } from '../models/Plant.js';
import { PlantsList } from '../models/PlantsList.js';
import { getByMode, config } from './connection.js';

dotenv.config();

export const createDatabase = async (): Promise<Sequelize> => {
  const dbName = getByMode(
    process.env.DB_NAME,
    process.env.DB_NAME_DEV,
    process.env.DB_NAME_DOCKER,
    process.env.DB_NAME_TEST
  );

  const databaseInstance = new Sequelize('', config.dbUser, config.dbPassword, {
    host: config.dbHost,
    dialect: 'mysql',
  });

  await databaseInstance.query(`CREATE DATABASE ${dbName};`);

  return databaseInstance;
};

export const createTables = async (
  databaseInstance: Sequelize
): Promise<void> => {
  const userModel = User;
  const plantModel = Plant;
  const plantListModel = PlantsList;

  await databaseInstance.sync({});

  console.log(userModel === databaseInstance.models.User);
  console.log(plantModel === databaseInstance.models.Plant);
  console.log(plantListModel === databaseInstance.models.PlantsList);
};

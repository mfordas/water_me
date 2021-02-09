import express from 'express';
import sequelize from 'sequelize';
import { TypePlant } from '../models/Plant';
import { TypePlantsList } from '../models/PlantsList';
import { TypeUser } from '../models/User';

type Models = {
  User: TypeUser;
  Plant: TypePlant;
  PlantsList: TypePlantsList;
};

const register = (
  app: express.Express,
  db: sequelize.Sequelize,
  models: Models
): express.Express => {
  console.log('[MySQL] models registered in database');
  app.use((req, res, next) => {
    res.locals.models = models;
    res.locals.db = db;
    next();
  });
  return app;
};

export default register;

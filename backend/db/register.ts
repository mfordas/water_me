import express from 'express';
import sequelize from 'sequelize';
import { PlantInstance } from '../models/Plant';
import { PlantsListInstance } from '../models/PlantsList';
import { UserInstance } from '../models/User';

type Models = {
  User: sequelize.ModelCtor<UserInstance>;
  Plant: sequelize.ModelCtor<PlantInstance>;
  PlantsList: sequelize.ModelCtor<PlantsListInstance>;
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

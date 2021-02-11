import sequelize, { Optional, Model } from 'sequelize';
import dbConnection from '../db/connection.js';

export type TypePlantsList = {
  id: number;
  userId: number;
  name: string;
};

interface TypePlantsListCreationAttributes
  extends Optional<TypePlantsList, 'id'> {}

export interface PlantsListInstance
  extends Model<TypePlantsList, TypePlantsListCreationAttributes>,
    TypePlantsList {}

const PlantsList = dbConnection.define<PlantsListInstance>(
  'PlantsList',
  {
    id: {
      primaryKey: true,
      type: sequelize.DataTypes.INTEGER.UNSIGNED,
    },
    userId: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

export { PlantsList };

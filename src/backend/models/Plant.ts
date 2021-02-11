import sequelize, { Optional, Model } from 'sequelize';
import dbConnection from '../db/connection.js';

export interface TypePlant {
  id: number;
  name: string;
  plantsListId: number;
  wateringCycle: number;
  pictureUrl: string;
  wateringCycleBeginingData: Date;
  lastTimeWatered: Date;
}

interface TypePlantCreationAttributes extends Optional<TypePlant, 'id'> {}

export interface PlantInstance
  extends Model<TypePlant, TypePlantCreationAttributes>,
    TypePlant {}

const Plant = dbConnection.define<PlantInstance>(
  'Plant',
  {
    id: {
      primaryKey: true,
      type: sequelize.DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
    },
    plantsListId: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    wateringCycle: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    pictureUrl: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
    },
    wateringCycleBeginingData: {
      type: sequelize.DataTypes.DATE,
      allowNull: false,
    },
    lastTimeWatered: {
      type: sequelize.DataTypes.DATE,
      allowNull: false,
    },
  },
  {}
);

export { Plant };

import sequelize, { Optional, Model } from 'sequelize';
import { mainSeqelizeInstation } from '../db/connection.js';

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

const Plant = mainSeqelizeInstation.define<PlantInstance>(
  'Plant',
  {
    id: {
      type: sequelize.DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
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

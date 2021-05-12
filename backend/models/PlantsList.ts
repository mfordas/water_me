import sequelize, { Optional, Model } from 'sequelize';
import { mainSeqelizeInstation } from '../db/connection';

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

const PlantsList = mainSeqelizeInstation.define<PlantsListInstance>(
  'PlantsList',
  {
    id: {
      type: sequelize.DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
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

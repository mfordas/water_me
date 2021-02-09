import sequelize from 'sequelize';
import dbConnection from '../db/connection.js';

export type TypePlantsList = {
  userId: number;
  name: string;
};

const PlantsList: sequelize.ModelCtor<
  sequelize.Model<TypePlantsList>
> = dbConnection.define(
  'PlantsList',
  {
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

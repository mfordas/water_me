import sequelize from 'sequelize';
import dbConnection from '../db/connection.js';

export type TypeUser = {
  googleId: string;
  name: string;
};

const User: sequelize.ModelCtor<
  sequelize.Model<TypeUser>
> = dbConnection.define(
  'User',
  {
    googleId: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

export { User };

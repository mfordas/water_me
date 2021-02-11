import sequelize, { Optional, Model } from 'sequelize';
import dbConnection from '../db/connection.js';

export type TypeUser = {
  id: number;
  googleId: string;
  name: string;
};

interface TypeUserCreationAttributes extends Optional<TypeUser, 'id'> {}

export interface UserInstance
  extends Model<TypeUser, TypeUserCreationAttributes>,
    TypeUser {}

const User = dbConnection.define<UserInstance>(
  'User',
  {
    id: {
      primaryKey: true,
      type: sequelize.DataTypes.INTEGER.UNSIGNED,
    },
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

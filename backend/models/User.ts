import sequelize, { Optional, Model } from 'sequelize';
import { mainSeqelizeInstation } from '../db/connection';

export type TypeUser = {
  id: number;
  googleId: string;
  name: string;
};

interface TypeUserCreationAttributes extends Optional<TypeUser, 'id'> {}

export interface UserInstance
  extends Model<TypeUser, TypeUserCreationAttributes>,
    TypeUser {}

const User = mainSeqelizeInstation.define<UserInstance>(
  'User',
  {
    id: {
      type: sequelize.DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
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

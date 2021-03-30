import sequelize, { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const getByMode = (
  prod: string | undefined,
  dev: string | undefined,
  test: string | undefined
): string => {
  if (process.env.NODE_ENV === 'production' && prod) {
    return prod;
  } else if (process.env.NODE_ENV === 'development' && dev) {
    return dev;
  } else if (process.env.NODE_ENV === 'test' && test) {
    return test;
  } else {
    return 'defaultValue';
  }
};

export const config = {
  dbHost: getByMode(
    process.env.DB_HOST,
    process.env.DB_HOST_DEV,
    process.env.DB_HOST_TEST
  ),
  dbUser: getByMode(
    process.env.DB_USER,
    process.env.DB_USER_DEV,
    process.env.DB_USER_TEST
  ),
  dbPassword: getByMode(
    process.env.DB_PASS,
    process.env.DB_PASS_DEV,
    process.env.DB_PASS_TEST
  ),
  dbName: getByMode(
    process.env.DB_NAME,
    process.env.DB_NAME_DEV,
    process.env.DB_NAME_TEST
  ),
};

export const mainSeqelizeInstation = new sequelize.Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: 'mysql',
  }
);

export const connectToDB = async (sequelizeInstation: Sequelize) => {
  try {
    await sequelizeInstation.authenticate();
    console.log(`Connected to ${sequelizeInstation.config.database}`);
    return sequelizeInstation;
  } catch {
    return new Error(
      `Can not connect to ${sequelizeInstation.config.database}`
    );
  }
};

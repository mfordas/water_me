import sequelize, { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbHost =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_HOST
    : process.env.DB_HOST_DEV;
const dbUser =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_USER
    : process.env.DB_USER_DEV;
const dbPassword =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_PASS
    : process.env.DB_PASS_DEV;
const dbName =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_NAME
    : process.env.DB_NAME_DEV;

let connection: sequelize.Sequelize;

if (dbHost && dbUser && dbPassword && dbName) {
  connection = new sequelize.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
  });
} else {
  connection = new sequelize.Sequelize('Testdb', 'Testuser', 'Testpassword', {
    host: 'localhost',
    dialect: 'mysql',
  });
}

export default connection;

import sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbHost = process.env.NODE_ENV === 'production' ? process.env.DB_HOST : process.env.DB_HOST_DEV;
        const dbUser = process.env.NODE_ENV === 'production' ? process.env.DB_USER : process.env.DB_USER_DEV;
        const dbPassword = process.env.NODE_ENV === 'production' ? process.env.DB_PASS : process.env.DB_PASS_DEV;
        const dbName = process.env.NODE_ENV === 'production' ? process.env.DB_NAME : process.env.DB_NAME_DEV;

export default new sequelize.Sequelize(dbName, dbUser, dbPassword, {
        host: dbHost,
        dialect: 'mysql'
    });
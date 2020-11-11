import sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export default new sequelize.Sequelize(process.env.DB_NAME_DEV, process.env.DB_USER_DEV, process.env.DB_PASS_DEV, {
        host: process.env.DB_HOST_DEV,
        dialect: process.env.DB_PROT_DEV
    });
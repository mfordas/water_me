import sequelize from 'sequelize';
import dbConnection from '../db/connection.js';

const User = dbConnection.define('User', {
    id:{
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoincrement: true,
    },
    email: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
    },
    plantsTable: {
        type: sequelize.DataTypes.INTEGER,
    }
},
{
});

export  { User };
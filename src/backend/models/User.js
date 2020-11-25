import sequelize from 'sequelize';
import dbConnection from '../db/connection.js';

const User = dbConnection.define('User', {
    googleId:{
        type: sequelize.DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
    },
},
{
});

export  { User };
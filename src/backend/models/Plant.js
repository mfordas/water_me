import sequelize from 'sequelize';
import dbConnection from '../db/connection.js';

const Plant = dbConnection.define('Plant', {

    id: {
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoincrement: true,
    },
    plantListId: {
        type: sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    wateringCycle: {
        type: sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    pictureUrl: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
    },
    wateringCycleBeginingData: {
        type: sequelize.DataTypes.DATE,
        allowNull: false,
    }
},
{
});

export { Plant };
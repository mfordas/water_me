import sequelize from 'sequelize';
import dbConnection from '../db/connection.js';

const PlantsList = dbConnection.define('PlantsList', {
    userId: {
        type: sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
    },
},
{
});

export { PlantsList };

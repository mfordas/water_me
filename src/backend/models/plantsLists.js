import sequelize from 'sequelize';

export const createPlantsListsModel = (dataBaseConnectionInstance) => {

const PlantList = dataBaseConnectionInstance.define('PlantList', {

    id: {
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoincrement: true,
    },
    userId: {
        type: sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
    },
    numberOfPlants: {
        type: sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    plantsTable: {
        type: sequelize.DataTypes.INTEGER,
    }
},
{
});

return PlantList;

};
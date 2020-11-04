import sequelize from 'sequelize';

export const createUsersModel = (dataBaseConnectionInstance) => {

const User = dataBaseConnectionInstance.define('User', {
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

return User;
};
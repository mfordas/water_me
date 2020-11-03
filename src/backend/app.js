import sequelize  from 'sequelize';
import express from 'express';

const app = express();


const runApp = async () => {
    const databaseConnection = new sequelize.Sequelize('water_me', 'admin', '123456', {
        host: 'localhost',
        dialect: 'mysql'
      });

    try {
    await databaseConnection.authenticate();

    console.log(`Connected to ${databaseConnection.config.database}`);

    } catch {
        console.log('Error');
    }

    app.listen(3000, () => 
    console.log(`Listening on port 3000`));

};

runApp();
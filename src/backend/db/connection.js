import sequelize from 'sequelize';

const dbConnect = async () => {
try {
    const databaseConnection = new sequelize.Sequelize('water_me', 'admin', '123456', {
        host: 'localhost',
        dialect: 'mysql'
    });

    // await databaseConnection.query("CREATE DATABASE `water_me`;");
    await databaseConnection.authenticate();

    console.log(`Connected to ${databaseConnection.config.database}`);
    
    return databaseConnection;

} catch {
    console.log('Error');
}

};

export default dbConnect
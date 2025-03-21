const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  String(process.env.DB_PASSWORD),
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
      // Указываем кодировку
      charset: 'utf8',
    },
  }
);

module.exports = sequelize;

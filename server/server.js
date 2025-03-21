const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express')
const sequelize = require('./db.js');

const routes = require('./routes/index.js')

const role = process.env.ROLE || 'customer';  // По умолчанию роль 'client'

// Загружаем соответствующий файл .env в зависимости от роли
dotenv.config({
  path: `.env${role}`  // Загружаем соответствующий файл .env для роли
});

console.log(`Пароль для роли ${role}: ${process.env.DB_PASSWORD}`);

const PORT = process.env.PORT;
const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Замените на адрес вашего фронтенда
    credentials: true}
));
app.use(express.json());
app.use('/api', routes);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Соединение с базой данных успешно!');
        await sequelize.sync(); 
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (e) {
        console.error('Ошибка при подключении к базе данных:', e);
    }
  };
  start();
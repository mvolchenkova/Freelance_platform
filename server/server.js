const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const sequelize = require('./db.js');
const routes = require('./routes/index.js');

// Получаем роль из переменной окружения
const role = process.env.ROLE || 'customer';  // По умолчанию роль 'customer'

// Загружаем соответствующий файл .env для роли
dotenv.config({ path: `.env${role}` });

console.log(`Пароль для роли ${role}: ${process.env.DB_PASSWORD}`);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);

const PORT = process.env.PORT || 5000;  // Используем порт из .env или 5000 по умолчанию
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',  // Замените на адрес вашего фронтенда
    credentials: true
}));
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

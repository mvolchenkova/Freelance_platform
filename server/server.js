const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express')
const sequelize = require('./db.js');

const routes = require('./routes/index.js')

const envFile = process.env.NODE_ENV === 'customer' ? '.env.customer' : '.env.freelancer';
dotenv.config({ path: envFile });

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
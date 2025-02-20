require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const models = require('./models/models');
const router = require('./routes/index');
const fileUpload = require('express-fileupload');
const path = require('path')

const PORT = process.env.PORT;

const userRouter = require('./routes/userRouter');
const portfolioRouter = require('./routes/portfolioRouter');
const taskRouter = require('./routes/taskRouter');
const responseRouter = require('./routes/responseRouter');
const addServiceRouter = require('./routes/addServiceRouter');
const balanceRouter = require('./routes/balanceRouter');
const dealRouter = require('./routes/dealRouter');
const reviewRouter = require('./routes/reviewRouter');
const skillAssessmentRouter = require('./routes/skillAssessmentRouter');
const categoryRouter = require('./routes/categoryRouter');
const skillRouter = require('./routes/skillRouter');
const projectRouter = require('./routes/projectRouter');
const languageRouter = require('./routes/languageRouter');
const transactionRouter = require('./routes/transactionRouter')


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use('/api/users', userRouter); 
app.use('/api/portfolios', portfolioRouter);
app.use('/api/tasks', taskRouter)
app.use('/api/responses', responseRouter);
app.use('/api/addServices', addServiceRouter);
app.use('/api/balances', balanceRouter);
app.use('/api/deals', dealRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/skillAssessments', skillAssessmentRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/skills', skillRouter);
app.use('/api/projects', projectRouter);
app.use('/api/languages', languageRouter);
app.use('/api/transactions', transactionRouter)

app.use('/api', router);


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

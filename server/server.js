require("dotenv").config();
const cors = require("cors");
const express = require("express");
const sequelize = require("./db.js");
const routes = require("./routes/index.js");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", routes);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Соединение с базой данных успешно!");
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("Ошибка при подключении к базе данных:", e);
  }
};

start();

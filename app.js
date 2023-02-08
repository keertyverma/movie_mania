require("dotenv").config({ path: __dirname + "/.env" });
const config = require("config");
const logger = require("./utils/logger");
require("express-async-errors");

const express = require("express");
const mongoose = require("mongoose");
const movieRouter = require("./routes/movies");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get(`/${config.get("app_name")}`, (req, res) => {
  res.send("<h1>Welcome to Movie mania</h1>");
});

// routes
app.use(`/${config.get("app_name")}/movies`, movieRouter);

// Connect with DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    logger.info("Connected to Mongo DB");
  })
  .catch((err) => {
    logger.error(err);
  });

app.listen(PORT, () => {
  logger.debug(`App Environment = ${process.env.NODE_ENV}`);
  logger.info(`Server is listening on PORT: ${PORT}`);
});

require("dotenv").config({ path: __dirname + "/.env" });
const config = require("config");
require("express-async-errors");
const logger = require("./utils/logger");

const express = require("express");
const mongoose = require("mongoose");
const movieRouter = require("./routes/movies");
const genreRouter = require("./routes/genres");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!process.env.JWT_PRIVATE_KEY) {
  logger.error("FATAL ERROR! JWT_PRIVATE_KEY is not defined");
  process.exit(1);
}

app.get(`/${config.get("app_name")}`, (req, res) => {
  res.send("<h1>Welcome to Movie mania</h1>");
});

// routes
app.use(`/${config.get("app_name")}/api/movies`, movieRouter);
app.use(`/${config.get("app_name")}/api/genres`, genreRouter);
app.use(`/${config.get("app_name")}/api/users`, userRouter);
app.use(`/${config.get("app_name")}/api/auth`, authRouter);

// Adding Middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

// Connect with DB
const db = config.get("mongoURI");
mongoose
  .connect(db)
  .then(() => {
    logger.info(`Connected to ${db}...`);
  })
  .catch((err) => {
    logger.error(err);
  });

const server = app.listen(PORT, () => {
  logger.debug(`App Environment = ${process.env.NODE_ENV}`);
  logger.info(`Server is listening on PORT: ${PORT}`);
});

module.exports = server;

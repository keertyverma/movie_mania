require("dotenv").config({ path: __dirname + "/.env" });
const config = require("config");
require("express-async-errors");
const logger = require("./utils/logger");

const express = require("express");
const mongoose = require("mongoose");
const movieRouter = require("./routes/movies");
const genreRouter = require("./routes/genres");

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`/${config.get("app_name")}`, (req, res) => {
  res.send("<h1>Welcome to Movie mania</h1>");
});

// routes
app.use(`/${config.get("app_name")}/movies`, movieRouter);
app.use(`/${config.get("app_name")}/genres`, genreRouter);

// Adding Middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

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

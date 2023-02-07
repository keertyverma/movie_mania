require("dotenv").config({ path: __dirname + "/.env" });
const config = require("config");
const logger = require("./utils/logger");

const express = require("express");
const movieRouter = require("./routes/movie");
const app = express();
const PORT = app.get("PORT") || 3000;

app.get(`/${config.get("app_name")}`, (req, res) => {
  res.send("<h1>Welcome to Movie mania</h1>");
});

// routes
app.use(`/${config.get("app_name")}/movies`, movieRouter);

app.listen(PORT, () => {
  logger.debug(`App Environment = ${app.get("env")}`);
  logger.info(`Server is listening on PORT: ${PORT}`);
});

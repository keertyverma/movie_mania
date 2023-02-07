require("dotenv").config({ path: __dirname + "/.env" });
const config = require("config");
const logger = require("./logger");

const express = require("express");

const app = express();
const PORT = app.get("PORT") || 3000;

app.get(`/${config.get("host")}`, (req, res) => {
  res.send("<h1>Welcome to Movie mania</h1>");
});

app.listen(PORT, () => {
  logger.debug(`App Environment = ${app.get("env")}`);
  logger.info(`Server is listening on PORT: ${PORT}`);
});

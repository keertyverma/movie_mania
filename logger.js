const { createLogger, transports } = require("winston");

const logger = createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  transports: [new transports.Console()],
  exceptionHandlers: new transports.File({
    filename: __dirname + "/logs/exceptions.log",
  }),
});

module.exports = logger;

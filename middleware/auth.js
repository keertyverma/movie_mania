const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const { StatusCodes } = require("http-status-codes");

const auth = function (req, res, next) {
  // check auth token in request
  const token = req.header("x-auth-code");
  if (!token)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Access Denied. Token is not provided");

  // verify auth token
  try {
    // decode auth token and store payload in req.user
    req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    logger.debug(`Authorizing access for user with id = ${req.user._id}`);

    next();
  } catch (ex) {
    return res.status(StatusCodes.BAD_REQUEST).send("Invalid Token");
  }
};

module.exports = auth;

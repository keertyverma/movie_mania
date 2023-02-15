const Joi = require("joi");
const bcrypt = require("bcrypt");

const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const logger = require("../utils/logger");
const User = require("../models/user");

const authRoutes = "/auth";

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

const authenticateUser = async (req, res) => {
  logger.debug(`POST call to ${authRoutes}`);
  // validate user input
  const { error } = validate(req.body);
  if (error) throw new BadRequestError(error.details[0].message);

  // check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new BadRequestError("Invalid email");

  // verify password
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordValid) throw new BadRequestError("Invalid password");

  res.status(StatusCodes.OK).send("Logged in successfully");
};

module.exports = authenticateUser;

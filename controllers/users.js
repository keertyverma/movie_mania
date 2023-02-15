const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const logger = require("../utils/logger");
const User = require("../models/user");

const userRoutes = "/users";

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
};

const createUser = async (req, res) => {
  logger.debug(`POST to ${userRoutes}/register`);

  // validated user input
  const { error } = validateUser(req.body);
  if (error) throw new BadRequestError(error.details[0].message);

  // check if user with email already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) throw new BadRequestError("User already registered.");

  // create user
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  // secure password with hashing
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  // generate auth code for authorization
  const token = user.generateAuthToken();

  // send auth code in response header
  res
    .header("x-auth-code", token)
    .status(StatusCodes.CREATED)
    .json(_.pick(user, ["_id", "name", "email"]));
};

module.exports = {
  createUser,
};

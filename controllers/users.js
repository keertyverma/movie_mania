const Joi = require("joi");
const _ = require("lodash");

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
  await user.save();

  res.status(StatusCodes.CREATED).json(_.pick(user, ["_id", "name", "email"]));
};

module.exports = {
  createUser,
};

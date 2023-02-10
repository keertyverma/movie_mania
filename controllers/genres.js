const { StatusCodes } = require("http-status-codes");
const logger = require("../utils/logger");
const { NotFoundError, BadRequestError } = require("../errors");

const { Genre } = require("../models/genre");

const genreRoute = "/genres";

const getAllGenres = async (req, res) => {
  logger.debug(`GET Request on Route -> ${genreRoute}/`);
  const genres = await Genre.find().select("name").sort("name");
  res.status(StatusCodes.OK).json(genres);
};

const createGenre = async (req, res) => {
  logger.debug(`POST Request on Route -> ${genreRoute}/`);

  logger.debug("creating new genre document");
  const genre = await Genre.create({ name: req.body.name });

  logger.debug(`new genre is added with id = ${genre.id}`);
  res.status(StatusCodes.CREATED).json(genre);
};

const getGenreById = async (req, res) => {
  logger.debug(`GET Request on Route -> ${genreRoute}/:id`);

  const id = req.params.id;
  const genre = await Genre.findById(id).select("name");
  if (!genre) {
    const error = `Genre with id = ${id} is not found.`;
    logger.error(error);
    throw new NotFoundError(error);
  }

  res.status(StatusCodes.OK).json(genre);
};

const updateGenre = async (req, res) => {
  logger.debug(`PATCH Request on Route -> ${genreRoute}/:id`);

  if (!req.body.name) {
    throw new BadRequestError("Genre 'name' field cannot be empty");
  }

  const id = req.params.id;
  const genre = await Genre.findByIdAndUpdate(
    id,
    {
      $set: { name: req.body.name },
    },
    { new: true }
  ).select("name");

  if (!genre) {
    const error = `Genre with id = ${id} is not found.`;
    logger.error(error);
    throw new NotFoundError(error);
  }

  res.status(StatusCodes.OK).json(genre);
};

const deleteGenre = async (req, res) => {
  logger.debug(`DELETE Request on Route -> ${genreRoute}/:id`);

  const id = req.params.id;
  const genre = await Genre.findByIdAndDelete(id).select("name");

  if (!genre) {
    const error = `Genre with id = ${id} is not found.`;
    logger.error(error);
    throw new NotFoundError(error);
  }

  res.status(StatusCodes.OK).json(genre);
};

module.exports = {
  getAllGenres,
  createGenre,
  getGenreById,
  updateGenre,
  deleteGenre,
};

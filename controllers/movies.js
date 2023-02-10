const express = require("express");
const { StatusCodes } = require("http-status-codes");

const logger = require("../utils/logger");
const { Movie } = require("../models/movie");
const { Genre } = require("../models/genre");
const { NotFoundError } = require("../errors");

const movieRoute = "/movies";

const getAllMovies = async (req, res) => {
  logger.debug(`GET Request on Route -> ${movieRoute}/`);
  const movies = await Movie.find().select({ __v: 0 });
  res.status(StatusCodes.OK).json(movies);
};

const _getGenres = async (genreIds) => {
  logger.debug(`finding all genre by ids = ${genreIds}`);

  const genres = await Genre.find({
    _id: {
      $in: genreIds,
    },
  }).select("name");

  // find any missing genre ids
  const fetchedIds = genres.map((genre) => genre._id.toString());
  const missingIds = genreIds.filter((id) => !fetchedIds.includes(id));

  if (missingIds.length > 0) {
    throw new NotFoundError(`Genre Ids = ${missingIds} are not found`);
  }

  return genres;
};

const createMovie = async (req, res) => {
  logger.debug(`POST Request on Route -> ${movieRoute}/`);

  const movie = {
    title: req.body.title,
  };

  // user will pass list of genre ID's
  const genreIds = req.body.genreIds;
  if (genreIds) {
    // fetch all genre by id
    movie.genres = await _getGenres(genreIds);
  }

  if (req.body.releaseDate) {
    movie.releaseDate = req.body.releaseDate;
  }
  if (req.body.posterUrl) {
    movie.posterUrl = req.body.posterUrl;
  }

  logger.debug("creating new movie document");
  const movieResult = await Movie.create(movie);
  logger.debug(`new movie is added with id = ${movieResult.id}`);

  res.status(StatusCodes.CREATED).json(movieResult);
};

const getMovieById = async (req, res) => {
  logger.debug(`GET Request on Route -> ${movieRoute}/:id`);

  const id = req.params.id;

  logger.debug(`Fetching movie with id = ${id}`);
  const movie = await Movie.findById(id).select({ __v: 0 });

  if (!movie) {
    const error = `No movie found with id = ${id}`;
    logger.error(error);
    throw new NotFoundError(error);
  }
  res.status(StatusCodes.OK).json(movie);
};

const updateMovieById = async (req, res) => {
  logger.debug(`Patch Request on Route -> ${movieRoute}/:id`);
  const id = req.params.id;

  logger.debug(`Updating movie with id = ${id}`);
  const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
    new: true,
  }).select({ __v: 0 });
  if (!updatedMovie) {
    const error = `No movie found with id = ${id}`;
    logger.error(error);
    throw new NotFoundError(error);
  }

  res.status(StatusCodes.OK).json(updatedMovie);
};

const deleteMovieById = async (req, res) => {
  logger.debug(`Delete Request on Route -> ${movieRoute}/:id`);
  const id = req.params.id;

  logger.debug(`Deleting movie with id = ${id}`);
  const deletedMovie = await Movie.findByIdAndDelete(id).select({ __v: 0 });
  if (!deletedMovie) {
    const error = `No movie found with id = ${id}`;
    logger.error(error);
    throw new NotFoundError(error);
  }
  res.status(StatusCodes.OK).json(deletedMovie);
};

module.exports = {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovieById,
  deleteMovieById,
};

const express = require("express");
const { StatusCodes } = require("http-status-codes");

const logger = require("../utils/logger");
const { Movie, Genre } = require("../models/movie");

const movieRoute = "/movies";

const getAllMovies = async (req, res) => {
  logger.debug(`GET Request on Route -> ${movieRoute}/`);
  const movies = await Movie.find();
  res.send(movies);
};

const createGenre = async (genres) => {
  const insertGenres = genres.map((genre) => {
    return { name: genre };
  });

  const genreResult = await Genre.create(insertGenres);
  logger.debug(`Genres are added.`);
  return genreResult;
};

const createMovie = async (req, res) => {
  logger.debug(`POST Request on Route -> ${movieRoute}/`);

  const movie = {
    name: req.body.name,
  };

  const genres = req.body.genres;
  if (genres) {
    const movieGenres = await createGenre(genres);
    movie.genres = movieGenres;
  }

  if (req.body.release_date) {
    movie.release_date = req.body.release_date;
  }
  if (req.body.poster_url) {
    movie.poster_url = req.body.poster_url;
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
  const movie = await Movie.findById(id);
  if (movie) {
    res.status(StatusCodes.OK).json(movie);
  } else {
    const error = `No movie found with id = ${id}`;
    logger.error(error);
    res.status(StatusCodes.NOT_FOUND).json({ msg: error });
  }
};

const updateMovieById = async (req, res) => {
  logger.debug(`Patch Request on Route -> ${movieRoute}/:id`);
  const id = req.params.id;

  logger.debug(`Updating movie with id = ${id}`);
  const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (updatedMovie) {
    res.status(StatusCodes.OK).json(updatedMovie);
  } else {
    const error = `No movie found with id = ${id}`;
    logger.error(error);
    res.status(StatusCodes.NOT_FOUND).json({ msg: error });
  }
};

const deleteMovieById = async (req, res) => {
  logger.debug(`Delete Request on Route -> ${movieRoute}/:id`);
  const id = req.params.id;

  logger.debug(`Deleting movie with id = ${id}`);
  const deletedMovie = await Movie.findByIdAndDelete(id);
  if (deletedMovie) {
    res.status(StatusCodes.OK).json(deletedMovie);
  } else {
    const error = `No movie found with id = ${id}`;
    logger.error(error);
    res.status(StatusCodes.NOT_FOUND).json({ msg: error });
  }
};

module.exports = {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovieById,
  deleteMovieById,
};

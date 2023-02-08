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

module.exports = {
  getAllMovies,
  createMovie,
};

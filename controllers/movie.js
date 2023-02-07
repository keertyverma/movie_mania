const express = require("express");
const logger = require("../utils/logger");

const getAllMovies = (req, res) => {
  res.send("all movies");
};

exports.getAllMovies = getAllMovies;

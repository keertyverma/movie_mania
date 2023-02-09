const { Genre } = require("../models/genre");

const getAllGenres = async (req, res) => {
  const genres = await Genre.find().select("name").sort("name");
  res.send(genres);
};

module.exports = {
  getAllGenres,
};

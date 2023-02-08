const mongoose = require("mongoose");
const _ = require("lodash");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [
      true,
      "Please check your data entry, no name specified for genre!",
    ],
    get: (v) => _.capitalize(v),
    set: (v) => _.capitalize(v),
  },
});

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [
      true,
      "Please check your data entry, no name specified for movie!",
    ],
    get: (v) => _.capitalize(v),
    set: (v) => _.capitalize(v),
  },
  genres: [genreSchema],
  release_date: Date,
  poster_url: String,
});

const Genre = mongoose.model("Genre", genreSchema);
const Movie = mongoose.model("Movie", movieSchema);

exports.Movie = Movie;
exports.Genre = Genre;
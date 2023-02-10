const mongoose = require("mongoose");
const _ = require("lodash");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [
      true,
      "Please check your data entry, no 'title' specified for movie!",
    ],
    unique: true,
    trim: true,
    maxlength: 255,
    get: (v) => _.capitalize(v),
    set: (v) => _.capitalize(v),
  },
  genres: [new mongoose.Schema({ name: String })],
  releaseDate: Date,
  posterUrl: String,
});

const Movie = mongoose.model("Movie", movieSchema);

exports.Movie = Movie;

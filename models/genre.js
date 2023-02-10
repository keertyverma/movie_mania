const mongoose = require("mongoose");
const _ = require("lodash");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [
      true,
      "Please check your data entry, no name specified for genre!",
    ],
    unique: true,
    get: (v) => _.capitalize(v),
    set: (v) => _.capitalize(v),
    trim: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = {
  genreSchema,
  Genre,
};

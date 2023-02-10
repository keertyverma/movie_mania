const express = require("express");
const {
  getAllGenres,
  createGenre,
  getGenreById,
  updateGenre,
} = require("../controllers/genres");

const router = express.Router();

router.route("/").get(getAllGenres).post(createGenre);
router.route("/:id").get(getGenreById).patch(updateGenre);

module.exports = router;

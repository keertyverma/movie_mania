const express = require("express");
const {
  getAllGenres,
  createGenre,
  getGenreById,
  updateGenre,
  deleteGenre,
} = require("../controllers/genres");

const router = express.Router();

router.route("/").get(getAllGenres).post(createGenre);
router.route("/:id").get(getGenreById).patch(updateGenre).delete(deleteGenre);

module.exports = router;

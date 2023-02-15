const express = require("express");
const {
  getAllGenres,
  createGenre,
  getGenreById,
  updateGenre,
  deleteGenre,
} = require("../controllers/genres");
const auth = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getAllGenres).post(auth, createGenre);
router
  .route("/:id")
  .get(getGenreById)
  .patch(auth, updateGenre)
  .delete(auth, deleteGenre);

module.exports = router;

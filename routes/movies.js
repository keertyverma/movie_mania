const express = require("express");
const {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovieById,
  deleteMovieById,
} = require("../controllers/movies");

const router = express.Router();

router.route("/").get(getAllMovies).post(createMovie);
router
  .route("/:id")
  .get(getMovieById)
  .patch(updateMovieById)
  .delete(deleteMovieById);

module.exports = router;

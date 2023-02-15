const express = require("express");
const {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovieById,
  deleteMovieById,
} = require("../controllers/movies");
const auth = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getAllMovies).post(auth, createMovie);
router
  .route("/:id")
  .get(getMovieById)
  .patch(auth, updateMovieById)
  .delete(auth, deleteMovieById);

module.exports = router;

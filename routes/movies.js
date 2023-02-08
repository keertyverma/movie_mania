const express = require("express");
const {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovieById,
} = require("../controllers/movies");

const router = express.Router();
router.get("/", getAllMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);
router.patch("/:id", updateMovieById);

module.exports = router;

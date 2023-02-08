const express = require("express");
const {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovieById,
  deleteMovieById,
} = require("../controllers/movies");

const router = express.Router();
router.get("/", getAllMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);
router.patch("/:id", updateMovieById);
router.delete("/:id", deleteMovieById);

module.exports = router;

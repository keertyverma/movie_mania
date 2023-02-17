const express = require("express");
const {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovieById,
  deleteMovieById,
} = require("../controllers/movies");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validate-objectid");

const router = express.Router();

router.route("/").get(getAllMovies).post(auth, createMovie);
router
  .route("/:id")
  .get(validateObjectId, getMovieById)
  .patch(auth, validateObjectId, updateMovieById)
  .delete(auth, validateObjectId, deleteMovieById);

module.exports = router;

const express = require("express");
const {
  getAllGenres,
  createGenre,
  getGenreById,
  updateGenre,
  deleteGenre,
} = require("../controllers/genres");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validate-objectid");

const router = express.Router();

router.route("/").get(getAllGenres).post(auth, createGenre);
router
  .route("/:id")
  .get(validateObjectId, getGenreById)
  .patch(auth, validateObjectId, updateGenre)
  .delete(auth, validateObjectId, deleteGenre);

module.exports = router;

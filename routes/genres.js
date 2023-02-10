const express = require("express");
const {
  getAllGenres,
  createGenre,
  getGenreById,
} = require("../controllers/genres");

const router = express.Router();

router.get("/", getAllGenres);
router.post("/", createGenre);
router.get("/:id", getGenreById);

module.exports = router;

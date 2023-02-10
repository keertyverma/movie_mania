const express = require("express");
const { getAllGenres, createGenre } = require("../controllers/genres");

const router = express.Router();

router.get("/", getAllGenres);
router.post("/", createGenre);

module.exports = router;

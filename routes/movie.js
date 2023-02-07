const express = require("express");
const { getAllMovies } = require("../controllers/movie");

const router = express.Router();

router.get("/", getAllMovies);

module.exports = router;

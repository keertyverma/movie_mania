const express = require("express");
const { getAllGenres } = require("../controllers/genres");

const router = express.Router();

router.get("/", getAllGenres);

module.exports = router;

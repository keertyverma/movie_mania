const express = require("express");
const authenticateUser = require("../controllers/auth");

const router = express.Router();

router.post("/", authenticateUser);

module.exports = router;

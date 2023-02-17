const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const validateObjectId = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid ID." });
  }

  next();
};

module.exports = validateObjectId;

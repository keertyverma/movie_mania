const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    minLength: 5,
    maxLength: 50,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    minLength: 5,
    maxLength: 255,
  },
  password: {
    type: String,
    require: true,
    trim: true,
    minLength: 5,
    maxLength: 1024,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_PRIVATE_KEY);
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

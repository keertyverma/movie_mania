const auth = require("../../../middleware/auth");
const User = require("../../../models/user");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/../../.env" });

describe("auth middleware", () => {
  it("should populate req.user with payload of valid JWT", () => {
    const user = { _id: new mongoose.Types.ObjectId().toHexString() };
    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    next = jest.fn();

    auth(req, res, next);

    expect(req.user).toMatchObject(user);
  });
});

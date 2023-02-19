const request = require("supertest");
const config = require("config");
const { Genre } = require("../../models/genre");
const User = require("../../models/user");

let server;

describe("auth middleware", () => {
  let token;

  beforeEach(() => {
    server = require("../../app");
    token = new User().generateAuthToken();
  });

  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  const exec = async function () {
    return await request(server)
      .post(`/${config.get("app_name")}/api/genres`)
      .set("x-auth-code", token)
      .send({ name: "genre1" });
  };

  it("should return 200 if token is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(201);
  });
  it("should return 401 if token is not passed", async () => {
    token = "";
    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "invalid-token";
    const res = await exec();

    expect(res.status).toBe(400);
  });
});

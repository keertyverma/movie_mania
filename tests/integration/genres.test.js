const request = require("supertest");
const config = require("config");
const mongoose = require("mongoose");
const _ = require("lodash");

const { Genre } = require("../../models/genre");
const User = require("../../models/user");

let server;
let endpoint = `/${config.get("app_name")}/api/genres`;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../app");
  });

  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      //populate Db by adding 2 genre
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);

      const res = await request(server).get(endpoint);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      // populate Db
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const id = genre._id;

      const res = await request(server).get(`${endpoint}/${id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id", genre._id.toHexString());
      expect(res.body).toHaveProperty("name", _.capitalize(genre.name));
    });

    it("should return BadRequestError-400 if id is not a valid mongoose ObjectID type", async () => {
      const invalidID = "1";

      const res = await request(server).get(`${endpoint}/${invalidID}`);

      expect(res.status).toBe(400);
      expect(res.body.msg).toMatch(/Invalid ID/);
    });

    it("should return NotFoundError-404 if genre is not found by id", async () => {
      const id = new mongoose.Types.ObjectId().toHexString();

      const res = await request(server).get(`${endpoint}/${id}`);

      expect(res.status).toBe(404);
      expect(res.body.msg).toMatch(/is not found/);
    });
  });

  describe("POST /", () => {
    let token;
    let name;

    const exec = async () => {
      return await request(server)
        .post(endpoint)
        .set("x-auth-code", token)
        .send({ name: name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "genre1";
    });

    it("should return UnAuthorized-401 if client is not logged in", async () => {
      token = "";
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return BadRequestError-400 if genre is invalid", async () => {
      // genre value is not string

      name = 12345;
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save genre if valid", async () => {
      const res = await exec();

      // Genre name gets capatilized while saving
      const genre = await User.find({ name: "Genre1" });
      expect(genre).not.toBeNull();
    });

    it("should return genre if valid", async () => {
      const res = await exec();

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "Genre1");
    });
  });

  describe("PATCH /", () => {
    let id;
    let token;
    let toUpdate;

    beforeEach(async () => {
      token = new User().generateAuthToken();

      let genre = new Genre({ name: "genre1" });
      await genre.save();
      id = genre._id;
    });

    const exec = async () => {
      return await request(server)
        .patch(`${endpoint}/${id}`)
        .send({ name: toUpdate })
        .set("x-auth-code", token);
    };

    it("should return UnAuthorized-401 if client is not logged in", async () => {
      token = "";
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should update genre if input is valid", async () => {
      toUpdate = "genre2";

      await exec();
      const genre = await Genre.findById(id);

      expect(genre.name).toEqual(_.capitalize(toUpdate));
    });

    it("should return 200 if input is valid", async () => {
      toUpdate = "genre2";

      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", _.capitalize(toUpdate));
    });

    it("should throw 400-BadRequestError if input is invalid", async () => {
      // genre name must be of string type only
      toUpdate = 12345;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.msg).toMatch(/must be a string/);
    });

    it("should throw 404-NotFoundError if genre id is invalid", async () => {
      id = new mongoose.Types.ObjectId();
      toUpdate = "genre2";

      const res = await exec();

      expect(res.status).toBe(404);
      expect(res.body.msg).toMatch(/not found/);
    });
  });

  describe("DELETE /", () => {
    let token;
    let id;

    beforeEach(async () => {
      token = new User().generateAuthToken();

      const genre = new Genre({ name: "genre1" });
      await genre.save();

      id = genre._id;
    });

    const exec = async () => {
      return await request(server)
        .delete(`${endpoint}/${id}`)
        .set("x-auth-code", token);
    };

    it("should return 401-Unauthorize if client is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should delete genre if id is valid", async () => {
      await exec();

      const genre = await Genre.findById(id);
      expect(genre).toBeNull();
    });

    it("should return 200 if id is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it("should return 404-NotFoundError if id is invalid", async () => {
      id = new mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
      expect(res.body.msg).toMatch(/not found/);
    });
  });
});

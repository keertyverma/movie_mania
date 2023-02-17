const request = require("supertest");
const config = require("config");
const mongoose = require("mongoose");
const _ = require("lodash");

const { Genre } = require("../../models/genre");

let server;

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

      const res = await request(server).get(
        `/${config.get("app_name")}/api/genres`
      );

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

      const res = await request(server).get(
        `/${config.get("app_name")}/api/genres/${id}`
      );

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id", genre._id.toHexString());
      expect(res.body).toHaveProperty("name", _.capitalize(genre.name));
    });

    it("should return BadRequestError-400 if id is not a valid mongoose ObjectID type", async () => {
      const invalidID = "1";

      const res = await request(server).get(
        `/${config.get("app_name")}/api/genres/${invalidID}`
      );

      expect(res.status).toBe(400);
      expect(res.body.msg).toMatch(/Invalid ID/);
    });

    it("should return NotFoundError-404 if genre is not found by id", async () => {
      const id = new mongoose.Types.ObjectId().toHexString();

      const res = await request(server).get(
        `/${config.get("app_name")}/api/genres/${id}`
      );

      expect(res.status).toBe(404);
      expect(res.body.msg).toMatch(/is not found/);
    });
  });
});

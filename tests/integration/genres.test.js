const request = require("supertest");
const config = require("config");

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
});

const request = require("supertest");
const app = require("../src/app"); // We need to export app from src/app.js
const db = require("../src/config/db");

describe("URL Shortener API", () => {
  // Cleanup database before tests starts
  beforeAll(async () => {
    // Clear the database so we start fresh for each test run
    await db.query("TRUNCATE TABLE urls RESTART IDENTITY CASCADE");
  });

  // Cleanup database after tests

  afterAll(async () => {
    await db.pool.end();
  });

  /** */
  describe("POST /api/shorten", () => {
    it("should create a new short URL", async () => {
      const res = await request(app).post("/api/shorten").send({
        original_url: "https://jestjs.io",
        expiresIn: 1,
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("short_url");
    });

    it("should return 400 if original_url is missing", async () => {
      const res = await request(app).post("/api/shorten").send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Original URL is required");
    });

    it("should return 429 if too many requests", async () => {
      // Send 6 requests to trigger the limit (limit is 5 in test)
      // Use a unique IP to avoid affecting other tests
      const testIp = "192.168.1.50";
      for (let i = 0; i < 6; i++) {
        const res = await request(app)
          .post("/api/shorten")
          .set("X-Forwarded-For", testIp) // Spoof IP
          .send({
            original_url: "https://jestjs.io",
          });

        if (i === 5) {
          expect(res.statusCode).toEqual(429);
          expect(res.body.success).toBe(false);
          expect(res.body.message).toBe(
            "Too many requests, please try again later.",
          );
        }
      }
    });

    it("should create a custom alias", async () => {
      const res = await request(app)
        .post("/api/shorten")
        .set("X-Forwarded-For", "10.0.0.5")
        .send({
          original_url: "https://twitter.com",
          alias: "my-twitter",
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.short_url).toContain("my-twitter");
    });

    it("should reject invalid alias characters", async () => {
      const res = await request(app)
        .post("/api/shorten")
        .set("X-Forwarded-For", "10.0.0.6")
        .send({
          original_url: "https://google.com",
          alias: "invalid alias!",
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toContain("letters, numbers, hyphens");
    });

    it("should reject duplicate alias", async () => {
      // Use a unique IP for this test flow
      const ip = "10.0.0.7";
      // First create
      await request(app).post("/api/shorten").set("X-Forwarded-For", ip).send({
        original_url: "https://fb.com",
        alias: "popular-link",
      });
      // Try creating again
      const res = await request(app)
        .post("/api/shorten")
        .set("X-Forwarded-For", ip)
        .send({
          original_url: "https://google.com",
          alias: "popular-link",
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe("Alias is already taken");
    });
  });

  describe("GET /:code", () => {
    it("should redirect to the original URL", async () => {
      // 1. Create a URL first (Use unique IP to avoid rate limit)
      const createRes = await request(app)
        .post("/api/shorten")
        .set("X-Forwarded-For", "10.0.0.1")
        .send({
          original_url: "https://wikipedia.org",
        });
      const shortCode = createRes.body.data.short_url.split("/").pop();

      // 2. Request the short code
      const res = await request(app).get(`/api/${shortCode}`);

      expect(res.statusCode).toEqual(302);
      expect(res.headers.location).toBe("https://wikipedia.org");
    });

    it("should return 404 for invalid code", async () => {
      const res = await request(app).get("/api/invalid-code-123");
      expect(res.statusCode).toEqual(404);
    });
  });
});

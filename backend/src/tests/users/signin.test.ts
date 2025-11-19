import request from "supertest";
import app from "../../index";

describe("POST /api/v1/auth/signin", () => {
  describe("Given All Fields", () => {
    it("Should return 200 for valid credentials", async () => {
      const userData = {
        username: "testuser",
        password: "testpassword",
      };

      const res = await request(app).post("/api/v1/auth/signin").send(userData);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message");
    });

    it("Should return JSON", async () => {
      const userData = {
        username: "testuser",
        password: "testpassword",
      };
      const res = await request(app).post("/api/v1/auth/signin").send(userData);
      expect(res.headers["content-type"]).toMatch(/json/);
    });
  });

  describe("Missing Fields", () => {
    it("Should return 411 if username is missing", async () => {
      const userData = {
        password: "testpassword",
      };
      const res = await request(app).post("/api/v1/auth/signin").send(userData);
      expect(res.statusCode).toBe(411);
      expect(res.body).toHaveProperty("message");
    });

    it("Should return 411 if password is missing", async () => {
      const userData = {
        username: "testuser",
      };
      const res = await request(app).post("/api/v1/auth/signin").send(userData);
      expect(res.statusCode).toBe(411);
      expect(res.body).toHaveProperty("message");
    });

    it("Should return 411 if both fields are missing", async () => {
      const userData = {};
      const res = await request(app).post("/api/v1/auth/signin").send(userData);
      expect(res.statusCode).toBe(411);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("Invalid Credentials", () => {
    it("Should return 400 for non-existent user", async () => {
      const userData = {
        username: "nonexistent",
        password: "anyPassword",
      };
      const res = await request(app).post("/api/v1/auth/signin").send(userData);
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    it("Should return 400 for incorrect password", async () => {
      const userData = {
        username: "testuser",
        password: "wrongPassword",
      };
      const res = await request(app).post("/api/v1/auth/signin").send(userData);
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
    });
  });
});

import request from "supertest";
import app from "../../index";

describe("POST /api/v1/auth/signup", () => {
  describe("Given All Fields", () => {
    it("Should return 201 for valid signup", async () => {
      const userData = {
        username: "newuser",
        password: "newpassword",
      };

      const res = await request(app).post("/api/v1/auth/signup").send(userData);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message");
    });

    it("Should return JSON", async () => {
      const userData = {
        username: "anotheruser",
        password: "anotherpassword",
      };
      const res = await request(app).post("/api/v1/auth/signup").send(userData);
      expect(res.headers["content-type"]).toMatch(/json/);
    });
  });

  describe("Missing Fields", () => {
    it("Should return 411 if username is missing", async () => {
      const userData = { password: "password123" };
      const res = await request(app).post("/api/v1/auth/signup").send(userData);
      expect(res.statusCode).toBe(411);
      expect(res.body).toHaveProperty("message");
    });

    it("Should return 411 if password is missing", async () => {
      const userData = { username: "user123" };
      const res = await request(app).post("/api/v1/auth/signup").send(userData);
      expect(res.statusCode).toBe(411);
      expect(res.body).toHaveProperty("message");
    });

    it("Should return 411 if both fields are missing", async () => {
      const userData = {};
      const res = await request(app).post("/api/v1/auth/signup").send(userData);
      expect(res.statusCode).toBe(411);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("Existing User", () => {
    it("Should return 400 if username already exists", async () => {
      const userData = {
        username: "existinguser", 
        password: "password123",
      };
      const res = await request(app).post("/api/v1/auth/signup").send(userData);
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
    });
  });
});

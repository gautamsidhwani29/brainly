"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
describe("POST /api/v1/auth/signin", () => {
    describe("Given All Fields", () => {
        it("Should return 200 for valid credentials", async () => {
            const userData = {
                username: "testuser",
                password: "testpassword",
            };
            const res = await (0, supertest_1.default)(index_1.default).post("/api/v1/auth/signin").send(userData);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("message");
        });
        it("Should return JSON", async () => {
            const userData = {
                username: "testuser",
                password: "testpassword",
            };
            const res = await (0, supertest_1.default)(index_1.default).post("/api/v1/auth/signin").send(userData);
            expect(res.headers["content-type"]).toMatch(/json/);
        });
    });
    describe("Missing Fields", () => {
        it("Should return 411 if username is missing", async () => {
            const userData = {
                password: "testpassword",
            };
            const res = await (0, supertest_1.default)(index_1.default).post("/api/v1/auth/signin").send(userData);
            expect(res.statusCode).toBe(411);
            expect(res.body).toHaveProperty("message");
        });
        it("Should return 411 if password is missing", async () => {
            const userData = {
                username: "testuser",
            };
            const res = await (0, supertest_1.default)(index_1.default).post("/api/v1/auth/signin").send(userData);
            expect(res.statusCode).toBe(411);
            expect(res.body).toHaveProperty("message");
        });
        it("Should return 411 if both fields are missing", async () => {
            const userData = {};
            const res = await (0, supertest_1.default)(index_1.default).post("/api/v1/auth/signin").send(userData);
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
            const res = await (0, supertest_1.default)(index_1.default).post("/api/v1/auth/signin").send(userData);
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
        it("Should return 400 for incorrect password", async () => {
            const userData = {
                username: "testuser",
                password: "wrongPassword",
            };
            const res = await (0, supertest_1.default)(index_1.default).post("/api/v1/auth/signin").send(userData);
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });
});

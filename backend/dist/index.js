"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const connection_1 = require("./config/connection");
const contentRouter_1 = __importDefault(require("./routes/contentRouter"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const tagsRouter_1 = __importDefault(require("./routes/tagsRouter"));
app.use(express_1.default.json());
const apiLimit = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: "Too many requests, please try again after 15 minutes",
    statusCode: 429,
    headers: true,
});
const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((0, cors_1.default)(corsOptions));
app.use(apiLimit);
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/auth", authRouter_1.default);
app.use("/api/v1/content", contentRouter_1.default);
app.use("/api/v1/tags", tagsRouter_1.default);
app.listen(config_1.default.port, () => {
    (0, connection_1.connectToDatabase)(config_1.default.mongo_url);
    console.log("Server Running on Port : ", config_1.default.port);
});
exports.default = app;

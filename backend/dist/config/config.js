"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const env = process.env.NODE_ENV;
const config = {
    port: Number(process.env.PORT || 3000),
    nodeEnv: env || "development",
    jwt_secret: process.env.JWT_SECRET_KEY || "default",
    mongo_url: env === "test" ? process.env.MONGO_URL || "" : process.env.MONGO_URL || "",
};
exports.default = config;

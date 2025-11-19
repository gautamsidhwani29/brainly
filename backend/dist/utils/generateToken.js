"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = async (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, config_1.default.jwt_secret, {
        expiresIn: "7d",
    });
    res.cookie("token", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: config_1.default.nodeEnv == "production" ? true : false,
        sameSite: "strict",
    });
    return token;
};
exports.default = generateToken;

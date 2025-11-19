"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const config_1 = __importDefault(require("../config/config"));
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.status(400).json({ message: "No Token" });
        const decoded = (await jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret));
        if (!decoded)
            return res.status(400).json({ message: "Invalid Token" });
        const user = await userModel_1.default.findOne({ _id: decoded.userId });
        if (!user)
            return res.status(401).json({ message: "User doesn't exists" });
        req.user = user;
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};
exports.default = authMiddleware;

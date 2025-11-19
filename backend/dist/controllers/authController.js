"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getProfile = exports.signin = exports.signup = void 0;
const authSchema_1 = __importDefault(require("../schemas/authSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const signup = async (req, res) => {
    try {
        const result = authSchema_1.default.safeParse(req.body);
        if (!result.success)
            return res.status(411).json({ message: result.error.issues });
        const user = result.data;
        const existingUser = await userModel_1.default.findOne({ username: user.username });
        if (existingUser)
            return res.status(403).json({ message: "Username Exists" });
        const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
        const newUser = new userModel_1.default({
            username: user.username,
            password: hashedPassword,
        });
        await newUser.save();
        await (0, generateToken_1.default)(String(newUser._id), res);
        return res.status(201).json({
            message: "User Created Sucessfully!",
            user: { _id: newUser._id, username: newUser.username },
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        const result = authSchema_1.default.safeParse(req.body);
        if (!result.success) {
            return res.status(411).json({ message: result.error.issues });
        }
        const user = result.data;
        const existingUser = await userModel_1.default.findOne({ username: user.username });
        if (!existingUser) {
            return res
                .status(400)
                .json({ message: "Incorrect username or password" });
        }
        const isPasswordCorrect = await bcrypt_1.default.compare(user.password, existingUser.password);
        if (!isPasswordCorrect) {
            return res
                .status(400)
                .json({ message: "Incorrect username or password" });
        }
        await (0, generateToken_1.default)(String(existingUser._id), res);
        return res.status(200).json({
            message: "Login Successful!",
            user: { _id: existingUser._id, username: existingUser.username },
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};
exports.signin = signin;
const getProfile = async (req, res) => {
    try {
        let userId = req.user._id;
        let user = await userModel_1.default.findById(userId).select("-password -__v");
        return res.status(200).json({ user });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};
exports.getProfile = getProfile;
const logout = async (req, res) => {
    var _a;
    try {
        if ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token) {
            res.clearCookie("token", {
                httpOnly: true,
                sameSite: true,
            });
            return res.status(200).json({ message: "Logged out successfully" });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Log out failed!",
        });
    }
};
exports.logout = logout;

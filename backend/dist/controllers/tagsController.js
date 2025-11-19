"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTags = void 0;
const tagsModel_1 = __importDefault(require("../models/tagsModel"));
const getTags = async (req, res) => {
    try {
        const tags = await tagsModel_1.default.find({});
        return res.status(200).json({ tags });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "" });
    }
};
exports.getTags = getTags;

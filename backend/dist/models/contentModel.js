"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const contentSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: ["document", "tweet", "youtube", "link"],
        required: true,
    },
    link: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    tags: [
        {
            type: String,
            ref: "Tags",
        },
    ],
    userId: {
        type: String,
        ref: "User",
    },
    shareable: {
        type: Boolean,
        default: false,
    },
    shareableId: {
        type: String,
        default: uuid_1.v4,
    },
    shareableLink: {
        type: String,
        unique: true,
        sparse: true,
    },
}, {
    timestamps: true,
});
contentSchema.pre("save", function (next) {
    if (this.shareableId && !this.shareableLink) {
        this.shareableLink = `http://localhost:3000/api/v1/content/shared/watch/${this.shareableId}`;
    }
    next();
});
const Content = mongoose_1.default.model("Content", contentSchema);
exports.default = Content;

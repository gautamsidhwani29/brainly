"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contentController_1 = require("../controllers/contentController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const contentRouter = (0, express_1.Router)();
contentRouter.get("/", authMiddleware_1.default, contentController_1.getContents);
contentRouter.get("/:contentId", authMiddleware_1.default, contentController_1.getContent);
contentRouter.post("/", authMiddleware_1.default, contentController_1.addContent);
contentRouter.patch("/:contentId", authMiddleware_1.default, contentController_1.editContent);
contentRouter.delete("/:contentId", authMiddleware_1.default, contentController_1.deleteContent);
contentRouter.patch("/shared/:contentId", authMiddleware_1.default, contentController_1.toggleShare);
contentRouter.get("/shared/watch/:shareableId", contentController_1.watchSharedContent);
exports.default = contentRouter;

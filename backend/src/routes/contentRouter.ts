import express, { Router } from "express";
import {
  addContent,
  deleteContent,
  editContent,
  getContent,
  getContents,
  toggleShare,
  watchSharedContent,
} from "../controllers/contentController";
import authMiddleware from "../middlewares/authMiddleware";
const contentRouter: express.Router = Router();

contentRouter.get("/", authMiddleware, getContents);
contentRouter.get("/:contentId", authMiddleware, getContent);
contentRouter.post("/", authMiddleware, addContent);
contentRouter.patch("/:contentId", authMiddleware, editContent);
contentRouter.delete("/:contentId", authMiddleware, deleteContent);
contentRouter.patch("/shared/:contentId", authMiddleware, toggleShare);
contentRouter.get("/shared/watch/:shareableId", watchSharedContent);

export default contentRouter;

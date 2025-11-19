import { Router } from "express";
import { getTags } from "../controllers/tagsController";
const tagsRouter = Router();

tagsRouter.get("/", getTags);

export default tagsRouter;

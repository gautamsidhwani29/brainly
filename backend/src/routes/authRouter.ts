import express, { Router } from "express";
import {
  signup,
  signin,
  getProfile,
  logout,
} from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const authRouter: express.Router = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.get("/myprofile", authMiddleware, getProfile);
authRouter.post("/logout", authMiddleware, logout);

export default authRouter;

import jwt, { decode, type JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { type Request, type Response, type NextFunction } from "express";
import User from "../models/userModel";
import config from "../config/config";
export interface DecodedToken extends JwtPayload {
  userId: string;
}
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ message: "No Token" });
    const decoded = (await jwt.verify(
      token,
      config.jwt_secret
    )) as DecodedToken;
    if (!decoded) return res.status(400).json({ message: "Invalid Token" });
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) return res.status(401).json({ message: "User doesn't exists" });
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export default authMiddleware;

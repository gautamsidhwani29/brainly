import config from "../config/config";
import jwt from "jsonwebtoken";
import { type Response } from "express";
import type { DecodedToken } from "../types/jwtTypes";
const generateToken = async (userId: string, res: Response) => {
  const token = jwt.sign({ userId } as DecodedToken, config.jwt_secret, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: config.nodeEnv == "production" ? true : false,
    sameSite: "strict",
  });
  return token;
};
export default generateToken;

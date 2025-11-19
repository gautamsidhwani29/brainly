import { type NextFunction, type Request, type Response } from "express";
import UserSchema from "../schemas/authSchema";
import bcrypt from "bcrypt";
import { type UserInput } from "../schemas/authSchema";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
  try {
    const result = UserSchema.safeParse(req.body);

    if (!result.success)
      return res.status(411).json({ message: result.error.issues });
    const user: UserInput = result.data;
    const existingUser = await User.findOne({ username: user.username });
    if (existingUser)
      return res.status(403).json({ message: "Username Exists" });

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new User({
      username: user.username,
      password: hashedPassword,
    });
    await newUser.save();
    await generateToken(String(newUser._id), res);
    return res.status(201).json({
      message: "User Created Sucessfully!",
      user: { _id: newUser._id, username: newUser.username },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const result = UserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(411).json({ message: result.error.issues });
    }

    const user: UserInput = result.data;

    const existingUser = await User.findOne({ username: user.username });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    }

    await generateToken(String(existingUser._id), res);

    return res.status(200).json({
      message: "Login Successful!",
      user: { _id: existingUser._id, username: existingUser.username },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    let userId = req.user._id;

    let user = await User.findById(userId).select("-password -__v");
    return res.status(200).json({ user });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    if (req.cookies?.token) {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: true,
      });
      return res.status(200).json({ message: "Logged out successfully" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Log out failed!",
    });
  }
};

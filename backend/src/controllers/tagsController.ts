import { type Request, type Response } from "express";
import Tags from "../models/tagsModel";

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tags.find({});
    return res.status(200).json({ tags });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "" });
  }
};

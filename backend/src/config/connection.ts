import mongoose from "mongoose";
export const connectToDatabase = async (url: string) => {
  await mongoose.connect(url);
  console.log("Connected to Database");
};

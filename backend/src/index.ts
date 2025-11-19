import express, { Application } from "express";
import config from "./config/config";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";
import { connectToDatabase } from "./config/connection";
import contentRouter from "./routes/contentRouter";
import rateLimit from "express-rate-limit";
const app: Application = express();
import cors from "cors";
import tagsRouter from "./routes/tagsRouter";

app.use(express.json());

const apiLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests, please try again after 15 minutes",
  statusCode: 429,
  headers: true,
});

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: "GET,POST,PUT,PATCH,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(apiLimit);
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/tags", tagsRouter);

app.listen(config.port, () => {
  connectToDatabase(config.mongo_url);
  console.log("Server Running on Port : ", config.port);
});

export default app;

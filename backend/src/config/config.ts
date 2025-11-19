import "dotenv/config";

type Config = {
  port: number;
  nodeEnv: string;
  jwt_secret: string;
  mongo_url: string;
};

const env = process.env.NODE_ENV;

const config: Config = {
  port: Number(process.env.PORT || 3000),
  nodeEnv: env || "development",
  jwt_secret: process.env.JWT_SECRET_KEY || "default",
  mongo_url:
    env === "test" ? process.env.MONGO_URL || "" : process.env.MONGO_URL || "",
};

export default config;

import { config } from "dotenv";

config({ path: ".env" });

function getEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
}

export const PORT = getEnv("PORT");
export const MONGO_URL = getEnv("MONGO_URL");
export const ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET");
export const REFRESH_TOKEN_SECRET = getEnv("REFRESH_TOKEN_SECRET");

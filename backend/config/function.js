import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./env.js";

export async function generateToken(userData) {
  const refreshToken = await jwt.sign(userData, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  const accessToken = await jwt.sign(userData, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  await Token.create({ token: refreshToken });

  return [accessToken, refreshToken];
}

import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/env.js";

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).send({ error: "Unauthorized" });

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send({ msg: "tokenExpired" });
      req.user = user;
      next();
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server middleware error" });
  }
}

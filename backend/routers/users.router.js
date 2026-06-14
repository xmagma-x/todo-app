import { Router } from "express";
import {
  loginUser,
  createUser,
  getUserInfo,
  logoutUser,
  refreshToken,
} from "../controllers/users.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const usersRouter = Router();
usersRouter.post("/", createUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/", authMiddleware, getUserInfo);
usersRouter.delete("/logout", logoutUser);
usersRouter.post("/token", refreshToken);

export default usersRouter;

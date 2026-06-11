import { Router } from "express";
import {
  loginUser,
  createUser,
  getUserInfo,
  logoutUser,
  refreshToken,
} from "../controllers/users.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const usersRouter = Router();
usersRouter.post("/", createUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/", authUser, getUserInfo);
usersRouter.delete("/logout", logoutUser);
usersRouter.post("/token", refreshToken);

export default usersRouter;

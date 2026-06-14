import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todos.controller.js";

const todosRouter = Router();

todosRouter.get("/", authMiddleware, getTodos);
todosRouter.post("/", authMiddleware, createTodo);
todosRouter.put("/:todoId", authMiddleware, updateTodo);
todosRouter.delete("/:todoId", authMiddleware, deleteTodo);

export default todosRouter;

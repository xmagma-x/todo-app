import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createTodo,
  deleteTodo,
  getTodoInfo,
  getTodos,
  updateTodo,
} from "../controllers/todos.controller.js";

const todosRouter = Router();

todosRouter.get("/", authMiddleware, getTodos);
todosRouter.get("/:todoId", authMiddleware, getTodoInfo);
todosRouter.post("/", authMiddleware, createTodo);
todosRouter.put("/:todoId", authMiddleware, updateTodo);
todosRouter.delete("/:todoId", authMiddleware, deleteTodo);

export default todosRouter;

import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todos.controller.js";

const todosRouter = Router();

todosRouter.get("/", authUser, getTodos);
todosRouter.post("/", authUser, createTodo);
todosRouter.put("/:todoId", authUser, updateTodo);
todosRouter.delete("/:todoId", authUser, deleteTodo);

export default todosRouter;

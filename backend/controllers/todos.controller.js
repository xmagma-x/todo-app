import { ObjectId } from "mongodb";
import Todo from "../models/todos.model.js";

export async function createTodo(req, res) {
  try {
    if ((!req.body.title, !req.body.description)) {
      return res
        .status(400)
        .send({ error: "please insert required data title & description" });
    }
    const { userId } = req.user;

    const result = await Todo.create({
      title: req.body.title,
      description: req.body.description,
      userId: userId,
    });

    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "Internal server error in getTodosByUserId" });
  }
}

export async function getTodos(req, res) {
  try {
    const { userId } = req.user;
    const result = await Todo.find({ userId: userId });

    if (result.length == 0) {
      return res.send({ msg: "there was no todos for this user" });
    }

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error in getting todos" });
  }
}

export async function updateTodo(req, res) {
  try {
    const { userId } = req.user;
    const { todoId } = req.params;

    if (!ObjectId.isValid(todoId)) {
      return res.status(400).send({ error: "Invalid Id" });
    }

    if (!req.body.title && !req.body.description) {
      return res
        .status(400)
        .send({ msg: "please insert at least one of the fields to update" });
    }

    const updateData = {};
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.description) updateData.description = req.body.description;

    const result = await Todo.findOneAndUpdate(
      { _id: todoId, userId: userId },
      { $set: updateData },
      { new: true },
    );

    if (!result) {
      return res
        .status(404)
        .send({ msg: "your user doesn't have a todo with this id" });
    }

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error in updating todo" });
  }
}

export async function deleteTodo(req, res) {
  try {
    const { userId } = req.user;
    const { todoId } = req.params;

    if (!ObjectId.isValid(todoId)) {
      return res.status(400).send({ error: "Invalid Id" });
    }

    const result = await Todo.findOneAndDelete({
      _id: todoId,
      userId: userId,
    });

    if (!result) {
      return res
        .status(404)
        .send({ msg: "your user doesn't have todo with this id" });
    }

    res.send({ msg: "todo is deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error in getting todos" });
  }
}

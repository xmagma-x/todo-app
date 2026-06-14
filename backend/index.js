import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import { MONGO_URL, PORT } from "./config/env.js";
import usersRouter from "./routers/users.router.js";
import todosRouter from "./routers/todos.router.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies to be sent/received
  }),
);
app.use("/users", usersRouter);
app.use("/todos", todosRouter);

await connect(MONGO_URL)
  .then(() => {
    console.log("now you are connected to DB succefully 😀");

    app.listen(PORT, () => {
      console.log(`server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

import axios from "axios";

async function getTodos() {
  const user = await axios
    .get("/users")
    .then((res) => res.data)
    .catch((err) => console.error(err));
  const todos = await axios
    .get("/todos")
    .then((res) => res.data)
    .catch((err) => console.error(err));
  return { user, todos };
}

export default getTodos;

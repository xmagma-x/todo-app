import axios from "axios";

async function getTodos() {
  try {
    const user = await axios.get("/users").then((res) => res.data);
    const todos = await axios.get("/todos").then((res) => res.data);
    return { user, todos };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getTodos;

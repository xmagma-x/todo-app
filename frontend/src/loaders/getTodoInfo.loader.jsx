import axios from "axios";

function getTodoInfo({ params }) {
  const { todoId } = params;
  return axios
    .get(`/todos/${todoId}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

export default getTodoInfo;

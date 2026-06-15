import axios from "axios";
import { MdEditSquare, MdDelete } from "react-icons/md";

function Todo({ data }) {
  function handleDelete(id) {
    axios.delete(`/todos/${id}`);
  }

  return (
    <div className="w-full bg-zinc-500/50 flex items-start justify-between rounded-md p-3">
      <h1 className="text-xl font-semibold">{data.title}</h1>

      <div className="flex justify-center items-cneter gap-3">
        <MdEditSquare className="text-zinc-700 hover:text-zinc-900 transition cursor-pointer size-6" />
        <MdDelete className="text-rose-800 hover:text-rose-900 transition cursor-pointer size-6" />
      </div>
    </div>
  );
}

export default Todo;

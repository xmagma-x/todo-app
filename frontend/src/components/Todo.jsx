import axios from "axios";
import toast from "react-hot-toast";
import { MdEditSquare, MdDelete } from "react-icons/md";
import { Link, useRevalidator } from "react-router";

function Todo({ data }) {
  const revalidator = useRevalidator();

  function handleDelete(id) {
    toast.promise(axios.delete(`/todos/${id}`), {
      loading: "Loading....",
      success: (res) => {
        revalidator.revalidate();
        return "Deleted successfully";
      },
      error: (err) => {
        console.log(err);
        return "Something went wrong";
      },
    });
  }

  return (
    <div className="w-full bg-zinc-500/50 flex items-start justify-between rounded-md p-3">
      <h1 className="text-xl font-semibold">{data.title}</h1>

      <div className="flex justify-center items-cneter gap-3">
        <Link to={`${data._id}`}>
          <MdEditSquare className="text-zinc-700 hover:text-zinc-900 transition cursor-pointer size-6" />
        </Link>
        <MdDelete
          className="text-rose-800 hover:text-rose-900 transition cursor-pointer size-6"
          onClick={() => handleDelete(data._id)}
        />
      </div>
    </div>
  );
}

export default Todo;

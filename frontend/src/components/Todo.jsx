import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { MdEditSquare, MdDelete } from "react-icons/md";
import { Link, useNavigate, useRevalidator } from "react-router";
import Input from "./Input";

function Todo({ data }) {
  const revalidator = useRevalidator();
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  function handleDelete(id) {
    toast.promise(axios.delete(`/todos/${id}`), {
      loading: "Loading....",
      success: () => {
        revalidator.revalidate();
        return "Deleted successfully";
      },
      error: (err) => {
        console.log(err);
        return "Something went wrong";
      },
    });
  }

  function toggleDialog() {
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const formData = Object.fromEntries(form.entries());

    toast.promise(axios.put(`/todos/${data._id}`, formData), {
      loading: "Loading....",
      success: (res) => {
        if (res.status === 200) navigate("/");
        return "Todo was updated successfully";
      },
      error: "Something went wrong",
    });
    toggleDialog();
  }

  return (
    <div className="w-full bg-zinc-500/50 flex items-start justify-between rounded-md p-3">
      <h1 className="text-xl font-semibold">{data.title}</h1>

      <div className="flex justify-center items-cneter gap-3">
        <MdEditSquare
          className="text-zinc-700 hover:text-zinc-900 transition cursor-pointer size-6"
          onClick={toggleDialog}
        />

        <dialog
          ref={dialogRef}
          className="m-auto p-4 rounded-lg shadow-lg backdrop:bg-black/50"
        >
          <div className="flex flex-col items-center justify-around gap-4">
            <h1 className="font-bold text-3xl text-zinc-900">Update Todo</h1>
            <form
              onSubmit={handleSubmitForm}
              className="flex flex-col items-center justify-around gap-4"
            >
              <div className="flex flex-col">
                <label htmlFor="title">Title:</label>
                <Input
                  required
                  autoComplete="off"
                  id="title"
                  name="title"
                  defaultValue={data.title}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="description">Description:</label>
                <Input
                  required
                  autoComplete="off"
                  id="description"
                  name="description"
                  defaultValue={data.description}
                />
              </div>
              <input
                type="submit"
                value="Update"
                className="px-3 py-2 m-2 rounded-m transition rounded-md bg-zinc-950 hover:bg-zinc-700 text-zinc-300"
              />
            </form>
            <p className="text-sm text-zinc-600">press esc to leave</p>
          </div>
        </dialog>

        <MdDelete
          className="text-rose-800 hover:text-rose-900 transition cursor-pointer size-6"
          onClick={() => handleDelete(data._id)}
        />
      </div>
    </div>
  );
}

export default Todo;

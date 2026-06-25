import axios from "axios";
import Button from "../components/Button";
import { useLoaderData, useNavigate } from "react-router";
import LinkButton from "../components/LinkButton";
import Todo from "../components/Todo";
import { useRef } from "react";
import Input from "../components/Input.jsx";
import toast from "react-hot-toast";

function Dashboard() {
  const dialogRef = useRef(null);
  const data = useLoaderData();
  const navigate = useNavigate();

  function handleSubmit() {
    localStorage.removeItem("token");
    axios.delete("/users/logout");
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

    toast.promise(axios.post("/todos", formData), {
      loading: "Loading.....",
      success: (res) => {
        if (res.status === 201) {
          navigate("/");
        }
        return "Created todo successfully";
      },
      error: "something went wrong",
    });
    toggleDialog();
  }

  return (
    <>
      <div className="flex flex-col items-center gap-7 w-lg">
        <h1 className="font-bold text-3xl text-zinc-900">Dashboard</h1>
        <div className="w-full flex flex-col gap-3">
          {!data.todos.msg ? (
            data.todos.map((todo) => <Todo key={todo._id} data={todo} />)
          ) : (
            <h1 className="text-lg font-semibold text-zinc-800 m-auto p-8">
              {data.todos.msg}
            </h1>
          )}
        </div>
        <div className="w-full flex items-center justify-around">
          <h1 className="font-bold text-lg flex flex-col items-center">
            logged in as <p className="text-red-700">{data?.user.username}</p>
          </h1>

          <Button
            onClick={toggleDialog}
            className="bg-zinc-950 hover:bg-zinc-700 text-zinc-300"
          >
            Create todo
          </Button>
          <dialog
            ref={dialogRef}
            className="m-auto p-4 rounded-lg shadow-lg backdrop:bg-black/50"
          >
            <div className="flex flex-col items-center justify-around gap-4">
              <h1 className="font-bold text-3xl text-zinc-900">Create Todo</h1>
              <form
                onSubmit={handleSubmitForm}
                className="flex flex-col items-center justify-around gap-4"
              >
                <div className="flex flex-col">
                  <label htmlFor="title">Title:</label>
                  <Input required autoComplete="off" id="title" name="title" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description">Description:</label>
                  <Input
                    required
                    autoComplete="off"
                    id="description"
                    name="description"
                  />
                </div>
                <input
                  type="submit"
                  value="Create"
                  className="px-3 py-2 m-2 rounded-m transition rounded-md bg-zinc-950 hover:bg-zinc-700 text-zinc-300"
                />
                <p className="text-sm text-zinc-600">pres esc to leave</p>
              </form>
            </div>
          </dialog>

          <form onSubmit={handleSubmit}>
            <input
              type="submit"
              value="Logout"
              className="px-3 py-2 m-2 cursor-pointer rounded-m transition rounded-md bg-rose-800 hover:bg-rose-700 text-zinc-200"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

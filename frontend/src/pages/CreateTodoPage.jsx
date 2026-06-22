import { useNavigate } from "react-router";
import Input from "../components/Input";
import axios from "axios";
import toast from "react-hot-toast";

function CreateTodoPage() {
  const navigate = useNavigate();
  function handleSubmit(e) {
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
  }
  return (
    <div className="flex flex-col items-center justify-around gap-4">
      <h1 className="font-bold text-3xl text-zinc-900">Create Todo</h1>
      <form
        onSubmit={handleSubmit}
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
      </form>
    </div>
  );
}

export default CreateTodoPage;

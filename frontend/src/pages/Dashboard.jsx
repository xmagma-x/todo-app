import axios from "axios";
import Button from "../components/Button";
import { useLoaderData } from "react-router";

function Dashboard() {
  const data = useLoaderData();

  console.log(data);

  function handleSubmit() {
    localStorage.removeItem("token");
    axios.delete("/users/logout");
  }

  return (
    <div className="flex flex-col items-center gap-4 w-lg">
      <h1 className="font-bold text-3xl text-zinc-900">Dashboard</h1>
      <div>{!data.todos.msg ? <h1>hello</h1> : <h1>{data.todos.msg}</h1>}</div>
      <div className="w-full flex items-center justify-around">
        <h1 className="font-bold text-lg flex flex-col items-center">
          logged in as <p className="text-red-700">{data?.user.username}</p>
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="submit"
            value="Logout"
            className="px-3 py-2 m-2 cursor-pointer rounded-m transition rounded-md bg-rose-800 hover:bg-rose-700 text-zinc-200"
          />
        </form>
      </div>
    </div>
  );
}

export default Dashboard;

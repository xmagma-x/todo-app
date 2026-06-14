import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../components/Button";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState({});

  function handleSubmit() {
    localStorage.removeItem("token");
    axios.delete("/users/logout");
  }

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <div>
      <h1>Dashboard</h1>
      <h1 className="font-bold text-lg ">
        logged in as <p className="text-red-700">{data?.username}</p>
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="submit"
          value="Logout"
          className="px-3 py-2 m-2 cursor-pointer rounded-m transition rounded-md bg-rose-800 hover:bg-rose-700 text-zinc-200"
        />
      </form>
    </div>
  );
}

export default Dashboard;

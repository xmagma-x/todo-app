import { Link } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import Container from "../components/Container";

function NotLogged() {
  return (
    <div className="w-80 h-80 flex flex-col items-center justify-around">
      <h1 className="text-3xl font-bold text-center text-zinc-900 mb-4">
        My Todo App
      </h1>
      <div className="flex items-center">
        <Link
          to="/signIn"
          className="px-3 py-2 m-2 rounded-m transition rounded-md bg-zinc-200 hover:bg-zinc-300 text-zinc-900 shadow-md hover:shadow-lg "
        >
          Sign In
        </Link>
        <Link
          to="/signUp"
          className="px-3 py-2 m-2 rounded-m transition rounded-md bg-zinc-950 hover:bg-zinc-700 text-zinc-300 shadow-md hover:shadow-lg "
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default NotLogged;

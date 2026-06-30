import LinkButton from "../components/LinkButton";

function NotLogged() {
  return (
    <div className="w-80 h-80 flex flex-col items-center justify-around">
      <h1 className="text-3xl font-bold text-center text-zinc-900 mb-4">
        My Todo App
      </h1>
      <div className="flex items-center">
        <LinkButton
          to="/signIn"
          className="bg-zinc-200 hover:bg-zinc-300 text-zinc-900"
        >
          Sign In
        </LinkButton>
        <LinkButton
          to="/signUp"
          className="bg-zinc-950 hover:bg-zinc-700 text-zinc-300"
        >
          Sign Up
        </LinkButton>
      </div>
    </div>
  );
}

export default NotLogged;

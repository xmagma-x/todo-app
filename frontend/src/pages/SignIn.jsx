import toast from "react-hot-toast";
import Container from "../components/Container";
import Input from "../components/Input";
import { PWD_REGEX, USER_REGEX, EMAIL_REGEX } from "../const";
import axios from "axios";
import { useNavigate } from "react-router";

function SignIn() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const formData = Object.fromEntries(form.entries());

    toast.promise(axios.post("/users/login", formData), {
      loading: "Signing in.....",
      success: (res) => {
        localStorage.setItem("token", res.data.accessToken);
        navigate("/");
        return "Signed in succefully";
      },
      error: (err) => {
        if (err.response?.status === 401) return "Invalid password";
        if (err.response?.status === 404) return "Username not found";
        console.log(err);
        return "something went wrong";
      },
    });
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-zinc-900 mb-4">
        Sign In
      </h1>
      <form
        className="flex flex-col items-center justify-around"
        onSubmit={handleSubmit}
        id="signInForm"
      >
        <div className="w-full mb-3">
          <label htmlFor="username">Username:</label>
          <Input id="username" name="username" required autoComplete="off" />
        </div>

        <div className="w-full mb-3">
          <label htmlFor="password">Password:</label>
          <Input id="password" type="password" required name="password" />
        </div>

        <input
          type="submit"
          className="px-3 py-2 m-4 rounded-md bg-zinc-950 hover:bg-zinc-700 transition text-zinc-300 cursor-pointer"
          value="Sign In"
        />
      </form>
    </>
  );
}

export default SignIn;

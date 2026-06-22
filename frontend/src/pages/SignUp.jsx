import { useState } from "react";
import Container from "../components/Container";
import Input from "../components/Input";
import { PWD_REGEX, USER_REGEX, EMAIL_REGEX } from "../const";
import NotValid from "../components/NotValid";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(true);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const [password, setPassword] = useState("");
  const [validPass, setValidPass] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPassConfirm, setValidPassConfirm] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    if (!validUsername || !validEmail || !validPass || !validPassConfirm) {
      toast.error("please make sure all fields are valid");
      return;
    }

    const formData = {
      username: username,
      email: email,
      password: password,
    };

    toast.promise(axios.post(`/users`, formData), {
      loading: "Loading.....",
      success: async (res) => {
        if (res.status === 201) {
          await axios
            .post("/users/login", { username: username, password: password })
            .then((res) => {
              localStorage.setItem("token", res.data.accessToken);
            });
        }
        navigate("/");
        return "Signed Up successfully";
      },
      error: (err) => {
        if (err.response.status === 409) {
          return "Username already exists use a different username";
        }
        return "Something went wrong";
      },
    });
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-zinc-900 mb-4">
        Sign Up
      </h1>
      <form
        className="flex flex-col items-center justify-around gap-3"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <label htmlFor="username">Username:</label>
          <Input
            id="username"
            value={username}
            required
            autoComplete="off"
            onChange={(e) => {
              setUsername(e.target.value);
              setValidUsername(USER_REGEX.test(e.target.value));
            }}
          />
          <NotValid valid={validUsername}>Username is not valid</NotValid>
        </div>

        <div className="w-full">
          <label htmlFor="email">Email:</label>
          <Input
            id="email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
              setValidEmail(EMAIL_REGEX.test(e.target.value));
            }}
          />
          <NotValid valid={validEmail}>Email is not valid</NotValid>
        </div>

        <div className="w-full">
          <label htmlFor="password">Password:</label>
          <Input
            id="password"
            type="password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setValidPass(PWD_REGEX.test(e.target.value));
            }}
          />
          <NotValid valid={validPass}>Password is not valid</NotValid>
        </div>

        <div className="w-full">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            required
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              e.target.value === password
                ? setValidPassConfirm(true)
                : setValidPassConfirm(false);
            }}
          />
          <NotValid valid={validPassConfirm}>Password doesn't match</NotValid>
        </div>

        <input
          type="submit"
          className="px-3 py-2 m-4 rounded-md bg-zinc-950 hover:bg-zinc-950/80 transition text-zinc-300 cursor-pointer"
          value="Sign Up"
        />
      </form>
    </>
  );
}

export default SignUp;

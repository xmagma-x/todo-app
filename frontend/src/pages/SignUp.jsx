import { useState } from "react";
import Container from "../components/Container";
import Input from "../components/Input";
import { PWD_REGEX, USER_REGEX, EMAIL_REGEX, BASE_URL } from "../const";
import NotValid from "../components/NotValid";
import axios from "axios";
import { useNavigate } from "react-router";

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
      alert("please make sure all fields are valids");
      return;
    }

    const formData = {
      username: username,
      email: email,
      password: password,
    };

    axios
      .post(`${BASE_URL}/users`, formData)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err?.response?.status === 409) {
          alert("Username already exists use a different username");
        }
      });
  }

  return (
    <Container className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-between p-5 bg-white/30 backdrop-blur-lg rounded-lg shadow-md border-lg border-white/40">
        <h1 className="text-3xl font-bold text-center text-zinc-900 mb-4">
          Sign Up
        </h1>
        <form
          className="flex flex-col items-center justify-around"
          onSubmit={handleSubmit}
        >
          <div className="w-full mb-3">
            <label htmlFor="username">Username:</label>
            <Input
              className="w-full m-0! mt-2!"
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

          <div className="w-full mb-3">
            <label htmlFor="email">Email:</label>
            <Input
              className="w-full m-0! mt-2!"
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

          <div className="w-full mb-3">
            <label htmlFor="password">Password:</label>
            <Input
              className="w-full m-0! mt-2!"
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

          <div className="w-full mb-3">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <Input
              className="w-full m-0! mt-2!"
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
            className="px-3 py-2 m-4 rounded-m rounded-md bg-zinc-950 hover:bg-zinc-700 transition text-zinc-300 cursor-pointer"
            value="Sign Up"
          />
        </form>
      </div>
    </Container>
  );
}

export default SignUp;

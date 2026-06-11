import Container from "../components/Container";
import Input from "../components/Input";

function SignIn() {
  return (
    <Container className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-between p-5 bg-white/30 backdrop-blur-lg rounded-lg shadow-md border-lg border-white/40">
        <h1 className="text-3xl font-bold text-center text-zinc-900 mb-4">
          Sign In
        </h1>
        <form className="flex flex-col items-center justify-around">
          <div className="w-full mb-3">
            <label htmlFor="username">Username:</label>
            <Input className="w-full m-0! mt-2!" id="username" />
          </div>
          <div className="w-full mb-3">
            <label htmlFor="password">Password:</label>
            <Input
              className="w-full m-0! mt-2!"
              id="password"
              type="password"
            />
          </div>
          <input
            type="submit"
            className="px-3 py-2 m-4 rounded-m rounded-md bg-zinc-950 hover:bg-zinc-700 transition text-zinc-300 cursor-pointer"
            value="Sign In"
          />
        </form>
      </div>
    </Container>
  );
}

export default SignIn;

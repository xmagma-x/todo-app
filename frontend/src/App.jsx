// import { useEffect, useState } from "react";
// import axios from "axios";
import { Link } from "react-router";
import Button from "./components/Button";
import Input from "./components/Input";
import Container from "./components/Container";
function App() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5500/todos", {
  //         headers: {
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWQ4ZjY1M2E4MDRkMWRmNjI4OTMwMGEiLCJ1c2VybmFtZSI6Im1hZ21hX3giLCJlbWFpbCI6Im1hZ21heEBnbWFpLmNvbSIsImlhdCI6MTc3Njc4OTE4OSwiZXhwIjoxNzc2NzkwMDg5fQ.kjuQcj9CsyZmBuPUR313XtLPpZ-QP0xV2xcnnJV2D3k`, // Retrieve token dynamically
  //         },
  //       });
  //       setData(response.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchTodos();
  // }, []);
  return (
    <Container className="flex flex-col items-center justify-center h-screen">
      <div className="w-80 h-80 flex flex-col items-center justify-around p-2 m-auto bg-white/30 backdrop-blur-lg rounded-lg shadow-md border-lg border-white/40">
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
      {/* <div>
      {data.map((todo) => (
        <h1 key={todo._id}>{todo.title}</h1>
      ))}
    </div> */}

      {/* <Button
        className="bg-zinc-950 hover:bg-zinc-700 text-rose-300"
        onClick={() => {
          console.log('you clicked the "Button"');
        }}
      >
        Click
      </Button>

      <Input /> */}
    </Container>
  );
}

export default App;

import { Outlet } from "react-router";
import Container from "./components/Container";

function App() {
  return (
    <Container className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-between p-5 bg-white/30 backdrop-blur-lg rounded-lg shadow-md border-lg border-white/40">
        <Outlet />
      </div>
    </Container>
  );
}

export default App;

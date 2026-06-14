import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { createRoot } from "react-dom/client";
import NotLogged from "./pages/NotLogged.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import { StrictMode } from "react";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import AuthLayout from "./layouts/AuthLayout.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";

axios.defaults.baseURL = "http://localhost:5500";
axios.defaults.withCredentials = true;

axios.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
});

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (
      error.response.status === 403 &&
      error.response?.data.msg === "tokenExpired"
    ) {
      axios
        .post("/users/token")
        .then((res) => {
          console.log(res.data.accessToken);
          localStorage.setItem("token", res.data.accessToken);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return Promise.reject(error);
  },
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <AuthLayout />,
        children: [{ index: true, element: <Dashboard /> }],
      },
      {
        element: <PublicLayout />,
        children: [
          { path: "/signIn", element: <SignIn /> },
          { path: "/signUp", element: <SignUp /> },
          { path: "/auth", element: <NotLogged /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

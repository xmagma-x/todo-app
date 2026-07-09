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
import getTodos from "./loaders/getTodos.loader.jsx";
import { Toaster } from "react-hot-toast";

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
    const originalRequest = error.config;

    if (
      error.response.status === 403 &&
      error.response?.data.msg === "tokenExpired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      return axios
        .post("/users/token")
        .then((res) => {
          localStorage.setItem("token", res.data.accessToken);
          return axios(originalRequest);
        })
        .catch((err) => {
          console.log("err", err);
          return Promise.reject(error);
        });
    } else if (
      error.response.status === 403 &&
      error.response?.data.msg === "Logout"
    ) {
      localStorage.removeItem("token");
      window.location.reload(true);
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
        children: [{ index: true, element: <Dashboard />, loader: getTodos }],
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
    <Toaster
      toastOptions={{
        style: {
          background: "rgba(255,255,255,0.3)",
          backdropFilter: "blur(70px)",
          borderRadius: "0.5rem",
          border: "1px solid rgba(255,255,255,0.4)",
        },
      }}
    />
  </StrictMode>,
);

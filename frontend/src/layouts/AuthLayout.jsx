import { Navigate, Outlet } from "react-router";

function AuthLayout() {
  const token = localStorage.getItem("token");

  // If user is NOT authenticated, redirect to login
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // If authenticated, show the page
  return <Outlet />;
}

export default AuthLayout;

import { Navigate, Outlet } from "react-router";

function PublicLayout() {
  const token = localStorage.getItem("token");

  // If user IS authenticated, redirect to dashboard
  if (token) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, show the page
  return <Outlet />;
}

export default PublicLayout;

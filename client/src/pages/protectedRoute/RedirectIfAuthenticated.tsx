import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const RedirectIfAuthenticated = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default RedirectIfAuthenticated;

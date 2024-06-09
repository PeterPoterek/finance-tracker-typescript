import useAuth from "@/hooks/useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;

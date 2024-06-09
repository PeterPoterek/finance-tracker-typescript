import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "@/hooks/useRefreshToken";
import useAuth from "@/hooks/useAuth";
import LoadingSpinner from "../loading/LoadingSpinner";

const PersistLogin = () => {
  const refresh = useRefreshToken();
  const { accessToken } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    !accessToken ? verifyRefreshToken() : setLoading(false);
  }, []);

  useEffect(() => {
    console.log(`loading ${loading}`);
    console.log(` ${accessToken}`);
  }, [loading]);

  return <>{loading ? <LoadingSpinner /> : <Outlet />}</>;
};

export default PersistLogin;

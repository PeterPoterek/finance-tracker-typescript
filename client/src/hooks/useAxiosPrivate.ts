import { useEffect, useRef } from "react";
import { axiosPrivateInstance } from "@/lib/axiosInstance";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/store";
import { logoutUser } from "../redux/slices/authSlice";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { accessToken, isLoggedIn } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggingOut = useRef(false);

  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"] && accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 403 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const newAccessToken = await refresh();
            if (newAccessToken) {
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              return axiosPrivateInstance(originalRequest);
            } else {
              throw new Error("Failed to refresh access token");
            }
          } catch (refreshError) {
            if (!isLoggingOut.current && isLoggedIn) {
              isLoggingOut.current = true;
              dispatch(logoutUser());
            }
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh, dispatch, isLoggedIn]);

  return axiosPrivateInstance;
};

export default useAxiosPrivate;

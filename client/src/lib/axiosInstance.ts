import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

const axiosPrivateInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export { axiosInstance, axiosPrivateInstance };

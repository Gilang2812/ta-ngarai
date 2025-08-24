import axios from "axios";
import { useSession } from "next-auth/react";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const { data } = useSession();
  if (data?.accessToken) {
    config.headers.Authorization = `Bearer ${data.accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
    
      window.location.href =
        "/login?redirect=" + error.response.status + window.location.pathname;
    }
    return Promise.reject(error);
  }
);

export const useAxiosAuth = () => {
  const { data: session } = useSession();
  const axiosAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  });

  axiosAuth.interceptors.request.use((config) => {
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  });

  return axiosAuth;
};
export const axiosServer = axios.create({ baseURL });

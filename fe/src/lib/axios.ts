import axios from "axios";
import { useSession } from "next-auth/react";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const useAxiosAuth = () => {
  const { data: session } = useSession();
  const axiosAuth = axios.create({
    baseURL: baseURL || "http://localhost:5000",
  });

  axiosAuth.interceptors.request.use((config) => {
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  });

  return axiosAuth;
};

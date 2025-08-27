import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const axiosServer = axios.create({ baseURL });

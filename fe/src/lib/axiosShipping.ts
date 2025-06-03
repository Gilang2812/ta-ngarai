import axios from "axios";

export const axiosShipping = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_SHIPPING_BASE_URL ||
    "https://api-sandbox.collaborator.komerce.id",
  headers: {
    Accept: "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_SHIPPING_COST || "default-key",
  },
});

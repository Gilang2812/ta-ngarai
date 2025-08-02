import { axiosInstance } from "@/lib/axios";
import { Address } from "@/type/schema/CheckoutSchema";
import { useQuery } from "@tanstack/react-query"

export const useFetchAddress = () => {
  return    useQuery<Address[]>({
    queryKey: ["addresses"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/addresses");
      return data;
    },
  });
};

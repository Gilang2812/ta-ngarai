import { useAxiosAuth } from "@/lib/axios";
import { Address } from "@/types/schema/CheckoutSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchAddress = () => {
  const axiosInstance = useAxiosAuth();
  return useQuery<Address[]>({
    queryKey: ["addresses"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/addresses");
      return data;
    },
  });
};

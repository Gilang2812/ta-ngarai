import { useAxiosAuth } from "@/lib/axios";
import { CartItemProps } from "@/types/schema/CraftCartSchema";
import { useQuery } from "@tanstack/react-query";
export const useFetchCraftCart = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<CartItemProps[]>({
    queryKey: ["craftCart"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/craft-carts");
      return data;
    }
  });
};

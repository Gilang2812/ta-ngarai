import { axiosInstance } from "@/lib/axios";
import { CartItemProps } from "@/type/schema/CraftCartSchema";
import { useQuery } from "@tanstack/react-query";
export const useFetchCraftCart = () => {
  return useQuery<CartItemProps[]>({
    queryKey: ["craftCart"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/craft-carts");
      return data;
    },
  });
};

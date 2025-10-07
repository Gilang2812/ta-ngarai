import { useAxiosAuth } from "@/lib/axios";
import { CartSchema } from "@/types/schema/CartSchema";
import { PackageSchema } from "@/types/schema/PackageSchema";
import { useQuery } from "@tanstack/react-query";

export type CartProps = CartSchema & { package: PackageSchema };
export const useFetchUserCarts = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<CartProps[]>({
    queryKey: ["userCart"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/carts");
      return data;
    },
  });
};

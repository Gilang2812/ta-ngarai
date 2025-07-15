import { axiosInstance } from "@/lib/axios";
import { CartSchema } from "@/type/schema/CartSchema";
import { PackageSchema } from "@/type/schema/PackageSchema";
import { useQuery } from "@tanstack/react-query";

export type CartProps = CartSchema & { package: PackageSchema };
export const useFetchUserCarts = () => {
  return useQuery<CartProps[]>({
    queryKey: ["userCart"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/carts");
      return data;
    },
  });
};

import { axiosInstance } from "@/lib/axios";
import { SouvenirPlaceSchema } from "@/type/schema/PackageSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserSouvenirPlace = <T>(craft = false) => {
  return useQuery<(SouvenirPlaceSchema & T)[]>({
    queryKey: ["sp-user"],
    queryFn: async () => {
      const { data } = await axiosInstance("/souvenirs/user/index", {
        params: {
          craft: craft,
        },
      });
      return data;
    },
  });
};

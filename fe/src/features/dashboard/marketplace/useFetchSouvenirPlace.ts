import { axiosInstance } from "@/lib/axios";
import { SouvenirPlaceSchema } from "@/type/schema/PackageSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchSouvenirPlace = <T>(craft = false) => {
  return useQuery<(SouvenirPlaceSchema&T)[]>({
    queryKey: ["sp"],
    queryFn: async () => {
      const { data } = await axiosInstance("/souvenirs", {
        params: {
          craft: craft,
        },
      });
      return data;
    },
  });
};

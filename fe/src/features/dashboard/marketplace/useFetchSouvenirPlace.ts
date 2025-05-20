import { axiosInstance } from "@/lib/axios";
import { SouvenirPlaceSchema } from "@/type/schema/PackageSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchSouvenirPlace = () => {
  return useQuery<SouvenirPlaceSchema[]>({
    queryKey: ["sp"],
    queryFn: async () => {
      const { data } = await axiosInstance("/souvenirs");
      return data;
    },
  });
};

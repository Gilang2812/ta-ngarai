import { useAxiosAuth } from "@/lib/axios";
import { DetailUserSouvenirPlace } from "@/types/schema/SouvenirSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchDetailUserSouvenirPlace = (status?: number) => {
  const params = status ? { status } : {};
  const axiosInstance = useAxiosAuth()
 return useQuery<DetailUserSouvenirPlace[]>({
    queryKey: ["detail-user-souvenir"],
    queryFn: async () => {
      const { data } = await axiosInstance("/souvenirs/detail/user", {
        params,
      });
      return data;
    },
  });
};

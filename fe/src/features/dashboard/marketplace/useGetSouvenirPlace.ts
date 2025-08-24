import { useAxiosAuth } from "@/lib/axios";
import { SouvenirPlaceSchema } from "@/type/schema/PackageSchema";
import { useQuery } from "@tanstack/react-query";

const useGetSouvenirPlace = (id: string) => {
  const axiosInstance = useAxiosAuth()
 return useQuery<
    SouvenirPlaceSchema & {
      galleries: {
        id: string;
        souvenir_place_id: string;
        url: string;
      }[];
    }
  >({
    queryKey: ["souvenir", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/souvenirs/${id}`);
      return data;
    },
    enabled: !!id
  });
};

export default useGetSouvenirPlace;

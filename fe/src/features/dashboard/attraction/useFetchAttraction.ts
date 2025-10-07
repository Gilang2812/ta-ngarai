import { useAxiosAuth } from "@/lib/axios";
import { AttractionSchema } from "@/types/schema/ObjectSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchAttraction = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<AttractionSchema[]>({
    queryKey: ["attractions"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/attractions");
      return data;
    },
  });
};

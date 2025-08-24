import { useAxiosAuth } from "@/lib/axios";
import { AttractionSchema } from "@/type/schema/ObjectSchema";
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

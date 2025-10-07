import { useAxiosAuth } from "@/lib/axios";
import { CulinarySchema } from "@/types/schema/ObjectSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchCulinary = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<CulinarySchema[]>({
    queryKey: ["culinary"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/culinary");
      return data;
    },
  });
};

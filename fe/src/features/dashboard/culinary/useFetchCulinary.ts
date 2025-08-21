import { axiosInstance } from "@/lib/axios";
import { CulinarySchema } from "@/type/schema/ObjectSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchCulinary = () => {
  return useQuery<CulinarySchema[]>({
    queryKey: ["culinary"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/culinary");
      return data;
    },
  });
};

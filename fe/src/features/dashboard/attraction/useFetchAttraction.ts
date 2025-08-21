import { axiosInstance } from "@/lib/axios";
import { AttractionSchema } from "@/type/schema/ObjectSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchAttraction = () => {
  return useQuery<AttractionSchema[]>({
    queryKey: ["attractions"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/attractions");
      return data;
    },
  });
};

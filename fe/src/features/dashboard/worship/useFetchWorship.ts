import { axiosInstance } from "@/lib/axios";
import { WorshipSchema } from "@/type/schema/ObjectSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchWorship = () => {
  return useQuery<WorshipSchema[]>({
    queryKey: ["worship"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/worship");
      return data;
    },
  });
};

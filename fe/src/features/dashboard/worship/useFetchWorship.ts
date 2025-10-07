import { useAxiosAuth } from "@/lib/axios";
import { WorshipSchema } from "@/types/schema/ObjectSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchWorship = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<WorshipSchema[]>({
    queryKey: ["worship"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/worship");
      return data;
    },
  });
};

import { useAxiosAuth } from "@/lib/axios";
import { TraditionalSchema } from "@/type/schema/ObjectSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchTraditional = () => {
  const axiosInstance = useAxiosAuth();
  return useQuery<TraditionalSchema[]>({
    queryKey: ["traditionals"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/traditionals");
      return data;
    },
  });
};

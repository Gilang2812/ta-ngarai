import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query"; 

export const useGetPackage = <T>(
  id: string,
  includes: ("package" | "service" | "gallery" | "reservation")[]
) => {
  return useQuery<T>({
    queryKey: ["package"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/packages/${id}`, {
        params: {
          includes: includes.join(","),
        },
      });
      return data;
    },
  });
};

import { useAxiosAuth } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetPackage = <T>(
  id: string,
  includes: ("package" | "service" | "gallery" | "reservation")[]
) => {
  const axiosInstance = useAxiosAuth()
 return useQuery<T>({
    queryKey: ["package", id],
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

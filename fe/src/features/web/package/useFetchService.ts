import { useAxiosAuth } from "@/lib/axios";
import { ServicePackage } from "@/type/schema/ServiceSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchService = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<ServicePackage[]>({
    queryKey: ["service_package"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/services/service`);
      return data;
    },
  });
};

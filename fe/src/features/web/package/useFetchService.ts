import { axiosInstance } from "@/lib/axios";
import { ServicePackage } from "@/type/schema/ServiceSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchService = () => {
  return useQuery<ServicePackage[]>({
    queryKey: ["service_package"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/services/service`);
      return data;
    },
  });
};

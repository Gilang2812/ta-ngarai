import { useAxiosAuth } from "@/lib/axios";
import { PackageTypeSchema } from "@/types/schema/PackageSchema";
 
import { useQuery } from "@tanstack/react-query";

export const useFetchPackageTypes = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<PackageTypeSchema[]>({
    queryKey: ["package_types"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/packages/types/index`);
      return data;
    },
  });
};

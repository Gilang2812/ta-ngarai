import { axiosInstance } from "@/lib/axios";
import { PackageTypeSchema } from "@/type/schema/PackageSchema";
 
import { useQuery } from "@tanstack/react-query";

export const useFetchPackageTypes = () => {
  return useQuery<PackageTypeSchema[]>({
    queryKey: ["package_types"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/packages/types/index`);
      return data;
    },
  });
};

import { axiosInstance } from "@/lib/axios";
import { DetailPackageSchema, PackageDay, PackageSchema } from "@/type/schema/PackageSchema";
import { useQuery } from "@tanstack/react-query";

type Packages = PackageSchema &
 { 
    packageDays: (PackageDay&{
        detailPackages:DetailPackageSchema[]
    })[]
};
export const useFetchPackages = () => {
  return useQuery<Packages[]>({
    queryKey: ["package"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/packages");
      return data;
    },
  });
};

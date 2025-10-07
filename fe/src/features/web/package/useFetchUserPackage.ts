import { useAxiosAuth } from "@/lib/axios";
import { Packages } from "@/types/schema/PackageSchema";
import { useQuery } from "@tanstack/react-query"; 

const useFetchUserPackage = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<Packages>({
    queryKey: ["user-package"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/packages/user/index");
      if (!data) {
        return data;
      }
    },
    refetchOnWindowFocus: false,
  });
};

export default useFetchUserPackage;

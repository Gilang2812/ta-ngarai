import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Packages } from "./useFetchPackage";

const useFetchUserPackage = () => {
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

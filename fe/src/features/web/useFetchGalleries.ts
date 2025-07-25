import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

 
export const useFetchGalleries = <Type>(object:string,id:string|object={}) => {
  return useQuery<Type[]>({
    queryKey: ["tourism_galleries"],
    queryFn: async () => { 
      const { data } = await axiosInstance.get(`/gallery/${object}`, {
        params: { id },
      });
      return data;
    },
    enabled: !!id && !!object
  });
};

import { useAxiosAuth } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query'; 

export const useGeoJSON = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery({
    queryKey: ['geojson'],  
    queryFn: async () => {
      const { data } = await axiosInstance.get('/geo');
      return data;
    },
  });
};

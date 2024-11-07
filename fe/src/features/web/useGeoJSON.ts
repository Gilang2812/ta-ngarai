import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query'; 

export const useGeoJSON = () => {
  return useQuery({
    queryKey: ['geojson'],  
    queryFn: async () => {
      const { data } = await axiosInstance.get('/geo');
      return data;
    },
  });
};

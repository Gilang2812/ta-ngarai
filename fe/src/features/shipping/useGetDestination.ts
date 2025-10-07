import { useAxiosAuth } from '@/lib/axios' 
import { DestinationResponse } from '@/types/schema/ShippingSchema'
import { useQuery } from '@tanstack/react-query'

const useGetDestination = (keyword?:string) => {
  const axiosInstance = useAxiosAuth()
 return useQuery<DestinationResponse>({
    queryKey: ['destination'],
    queryFn: async ()=>{
        const { data } = await axiosInstance.get('/shipping/destination',{
            params:{
                keyword: keyword
            }
        })
        return data
    },
    enabled: !!keyword,  
  })
  
}

export default useGetDestination

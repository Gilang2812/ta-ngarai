import { axiosInstance } from '@/lib/axios' 
import { DestinationResponse } from '@/type/schema/ShippingSchema'
import { useQuery } from '@tanstack/react-query'

const useGetDestination = (keyword?:string) => {
  return useQuery<DestinationResponse>({
    queryKey: ['destination'],
    queryFn: async ()=>{
        const {data} = await axiosInstance.get('/shipping/destination',{
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

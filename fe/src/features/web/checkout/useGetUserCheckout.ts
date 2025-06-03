import { axiosInstance } from "@/lib/axios"
import { Checkout } from "@/type/schema/CheckoutSchema"
import { useQuery } from "@tanstack/react-query"

export const useGetUserCheckout = () => {
  return useQuery<Checkout>({
    queryKey: ["userCheckout"],
    queryFn: async () => {
     const {data} = await axiosInstance.get('/checkouts')
     return data
    }, 
  })
}
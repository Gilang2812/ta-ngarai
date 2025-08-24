import { useAxiosAuth } from "@/lib/axios"
import { Checkout } from "@/type/schema/CheckoutSchema"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetUserCheckout = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<Checkout,AxiosError>({
    queryKey: ["userCheckout"],
    queryFn: async () => {
     const { data } = await axiosInstance.get('/checkouts')
     return data
    }, 
  })
}
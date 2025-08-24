import { useAxiosAuth } from "@/lib/axios";
import { PaymentDetails } from "@/type/schema/PaymentSchema";
import { useQuery } from "@tanstack/react-query";

export const useGetPaymentById = (id: string) => {
  const axiosInstance = useAxiosAuth()
 return useQuery<PaymentDetails>({
    queryKey: ["payment", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/payment/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

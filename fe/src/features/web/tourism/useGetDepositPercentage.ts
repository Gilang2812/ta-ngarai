import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetDepositPercentage = (id: string) => {
  return useQuery<{ deposit_percentage: number }>({
    queryKey: ["deposit-percentage", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/tourism/${id}/deposit-percentage`
      );
      return data.deposit_percentage;
    },
    enabled: !!id,
  });
};

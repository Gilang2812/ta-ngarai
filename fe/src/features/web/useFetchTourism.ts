import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchTourism = (id: string) => {
  return useQuery<{
    id: string;
    name: string;
    type_of_tourism: string;
    address: string;
    deposit_percentage: number;
    open: string;
    close: string;
    ticket_price: number;
    contact_person: string;
    bank_code: string;
    bank_name: string;
    bank_account: string;
    bank_account_holder: string;
    bank_account_number: string;
    qr_url: string;
    galleries: {
      id: string;
      tourism_village_id: string;
      url: string;
    }[];
  }>({
    queryKey: ["tourism_info"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/tourism/${id}`);
      return data;
    },
  });
};

import useAuth from "@/hooks/useAuth";
import { useAxiosAuth } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchInvoice = (id: string) => {
  const { user } = useAuth();
  const axiosInstance = useAxiosAuth()
 return useQuery({
    queryKey: ["invoice" + id],
    queryFn: async () => {
      const { data } = await axiosInstance(
        `/invoice/pdfmake/${id}?user=${JSON.stringify(user)}`,
        {
          responseType: "blob", // wajib agar response berupa Blob
        }
      );

      return data;
    },

    enabled: false,
  });
};

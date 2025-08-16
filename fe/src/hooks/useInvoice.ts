import { useFetchInvoice } from "@/features/common/useFetchInvoice";
import { cornerAlert, showLoadingAlert } from "@/utils/AlertUtils";
import { useEffect } from "react";

const useInvoice = (id: string) => {
  const { data, refetch, isFetching, isSuccess } = useFetchInvoice(id);

  useEffect(() => {
    if (isSuccess && data) {
      const blob = new Blob([data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "invoice.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      cornerAlert("Invoice berhasil dibuat!");
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isFetching) {
      showLoadingAlert("creating pdf");
    }
  }, [isFetching]);

  return { refetch, isFetching };
};

export default useInvoice;

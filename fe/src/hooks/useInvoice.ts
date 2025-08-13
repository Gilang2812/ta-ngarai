import { useFetchInvoice } from "@/features/common/useFetchInvoice";
import { hideLoadingAlert, showLoadingAlert } from "@/utils/AlertUtils";
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
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isFetching) {
      showLoadingAlert();
    }
    return () => {
      hideLoadingAlert();
    };
  }, [isFetching]);

  return { refetch, isFetching };
};

export default useInvoice;

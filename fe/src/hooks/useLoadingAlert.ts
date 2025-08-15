import { useEffect, useRef } from "react";
import Swal from "sweetalert2";

const useLoadingAlert = (isLoading?: boolean) => {
  const swalOpen = useRef(false);
  useEffect(() => {
    return () => {
      if (swalOpen.current) {
        Swal.close();
      }
    };
  }, []);
  const showLoadingAlert = (message?: string) => {
    Swal.fire({
      title: message || "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (!isLoading) {
          Swal.close();
        }
      },
      willClose: () => {
        Swal.hideLoading();
      },
    });
  };

  return {
    showLoadingAlert,
  };
};

export default useLoadingAlert;

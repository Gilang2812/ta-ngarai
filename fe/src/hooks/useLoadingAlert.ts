import { useRef } from "react";
import Swal from "sweetalert2";

const useLoadingAlert = (id: string) => {
  const activeAlertId = useRef<string | null>(null);
  const swalOpen = useRef(false);
  const isLoadingAlert = useRef(false);

  const showLoadingAlert = (message?: string) => {
    if (swalOpen.current && activeAlertId.current === id) return;

    activeAlertId.current = id || "loading";
    swalOpen.current = true;
    isLoadingAlert.current = true;

    Swal.fire({
      title: message || "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        swalOpen.current = false;
        isLoadingAlert.current = false;
        activeAlertId.current = null;
      },
    });
  };

  const hideLoadingAlert = (alertId?: string) => {
    if (
      Swal.isVisible() &&
      isLoadingAlert.current &&
      activeAlertId.current === (alertId || id)
    ) {
      Swal.close();
    }
  };

  return {
    showLoadingAlert,
    hideLoadingAlert,
  };
};

export default useLoadingAlert;

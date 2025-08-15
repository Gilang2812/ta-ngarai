import React from "react";
import Swal from "sweetalert2";

type Props = {};

const useLoadingAlert = (id: string) => {
  let activeAlertId: string | null = null;
  let swalOpen = false;
  let isLoadingAlert = false;

  const showLoadingAlert = (message?: string) => {
    // Jangan tampilkan kalau alert dengan id yang sama sudah terbuka
    if (swalOpen && activeAlertId === id) return;

    activeAlertId = id || "deleting" || null;
    swalOpen = true;
    isLoadingAlert = true;

    Swal.fire({
      title: message || "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        swalOpen = false;
        isLoadingAlert = false;
        activeAlertId = null;
      },
    });
  };

  const hideLoadingAlert = (id?: string) => {
    // Tutup hanya jika id cocok
    if (Swal.isVisible() && isLoadingAlert && activeAlertId === id) {
      Swal.close();
    }
  };

  return {
    showLoadingAlert,
    hideLoadingAlert,
  };
};

export default useLoadingAlert;

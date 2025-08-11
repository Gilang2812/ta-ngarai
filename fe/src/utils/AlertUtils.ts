import { DataError, Message } from "@/type/props/ErrorProps";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

export const showAlertOk = (message: string) => {
  Swal.fire(message);
};
export const showCreateAlert = (message: string) => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: `The ${message} was successfully added `,
    showConfirmButton: false,
    timer: 1500,
  });
};
export const showSuccessAlert = (message: string) => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: `  ${message}  `,
    showConfirmButton: false,
    timer: 1500,
  });
};
export const showEditeAlert = (message: string) => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: `The ${message} was successfully Edited `,
    showConfirmButton: false,
    timer: 1500,
  });
};
export const showDeleteAlert = (message: string) => {
  return Swal.fire({
    icon: "success",
    title: "Delete",
    text: `The ${message} was successfully deleted `,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const showErrorAlert = (error: AxiosError) => {
  const responseData = error?.response?.data;

  const dataError = responseData as DataError;
  const messageError = responseData as Message;
  const detailMessages = dataError?.details?.map((d) => d?.message) || [];

  const fallbackMessage =
    detailMessages.join(", ") ||
    messageError?.message ||
    responseData ||
    "Internal Server Error";

  return Swal.fire({
    icon: "error",
    title: error?.response?.status?.toString() || "Oops...",
    html: `<span class="text-red-600">${fallbackMessage}</span>`,
    confirmButtonText: "OK",
    confirmButtonColor: "#2D499D",
  });
};

export const showWarningAlert = (message: string) => {
  return Swal.fire({
    icon: "warning",
    title: "Warning",
    text: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const confirmDeleteAlert = async (
  object: string,
  name: string,
  confirm: () => void
) => {
  return Swal.fire({
    title: `Delete ${object}?`,
    text: `You are about to remove ${name}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(220, 53, 69)",
    cancelButtonColor: "rgb(52, 58, 64)",
    confirmButtonText: "Ok",
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleting...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      confirm();
      return true;
    } else {
      return false;
    }
  });
};

export const confirmAlert = async (
  title: string,
  message: string,
  confirm: () => void
) => {
  return Swal.fire({
    title: title,
    text: message,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "rgb(67, 94, 190)",
    cancelButtonColor: "rgb(52, 58, 64)",
    confirmButtonText: "Ok",
  }).then(async (result) => {
    if (result.isConfirmed) {
      confirm();
      return true;
    } else {
      return false;
    }
  });
};

export const cornerAlert = (message: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "success",
    title: message,
  });
};

export const cornerError = (message: string | undefined) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "error",
    title: message,
  });
};

let swalOpen = false;
let isLoadingAlert = false;

export const showLoadingAlert = (message?: string) => {
  if (swalOpen) return;
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
    },
  });
};

export const hideLoadingAlert = () => {
  if (Swal.isVisible() && isLoadingAlert) {
    Swal.close();
  }
};

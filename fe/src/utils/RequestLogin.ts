import Swal from "sweetalert2";

export const handleRequestLogin = (callbackUrl: string) => {
  Swal.fire({
    title: "You Are Not Login",
    text: "Please login to continue",
    icon: "warning",
    showDenyButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/login?callbackUrl=${encodeURIComponent(
        callbackUrl
      )}`;
    }
  });
};

import { ROUTES } from "@/data/routes";
import { UserLogin } from "@/validation/authSchema";
import Swal from "sweetalert2";
import { handleRequestLogin } from "../RequestLogin";

export const validateUser = (user: UserLogin | null, pathname: string) => {
  const nullAddress = !user?.address && "address";
  const nullPhone = !user?.phone && "phone number";
  const nullFields = `${nullAddress || nullPhone ? " " : ""}${nullAddress}${
    nullAddress && nullPhone ? " and " : ""
  }${nullPhone}`;
  if (!user) return handleRequestLogin(pathname);
  Swal.fire({
    icon: "error",
    title: "Complete profile",
    text: `Complete your ${nullFields}.`,
    denyButtonText: "Later",
    confirmButtonText: "Update Profile",
    showDenyButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      if (!user.address) return (window.location.href = ROUTES.PROFILE);
      else if (!user.phone)
        return (window.location.href = ROUTES.UPDATE_PROFILE);
    }
  });
};

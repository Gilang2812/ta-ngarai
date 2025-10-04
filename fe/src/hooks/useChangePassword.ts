import { ROUTES } from "@/data/routes";
import { useChangeUserPassword } from "@/features/auth/useChangeUserPassword";
import { cornerAlert } from "@/utils/AlertUtils";
import { ChangePasswordSchema } from "@/validation/authSchema";
import { useRouter } from "next/navigation";

const useChangePassword = () => {
  const router = useRouter();
  const initialValues: ChangePasswordSchema = {
    newPassword: "",
    confirmNewPassword: "",
  };

  const { mutate, isPending } = useChangeUserPassword({
    onSuccess: () => {
      router.push(ROUTES.PROFILE);
      cornerAlert("Password changed successfully");
    },
  });
  const handleSubmit = (values: typeof initialValues) => {
    mutate(values);
  };
  return {
    initialValues,
    handleSubmit,
    isPending,
  };
};

export default useChangePassword;

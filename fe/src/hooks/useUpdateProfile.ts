import { useUpdateUserProfile } from "@/features/auth/useUpdateUserProfile";
import useAuth from "./useAuth";
import { cornerAlert } from "@/utils/AlertUtils";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/data/routes";
import { UpdateProfileForm } from "@/validation/authSchema";

const useUpdateProfile = () => {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  
  const { mutate } = useUpdateUserProfile({
    onSuccess: (data) => {
      cornerAlert("Profile updated successfully");
      const userData = data as {
        fullname: string;
        address: string;
        phone: string;
      };
      updateUser({
        name: userData.fullname,
        phone: userData.phone,
      });
      router.push(ROUTES.PROFILE);
    },
  });
  const initialValues = {
    fullname: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
  };

  const handleSubmit = (values: UpdateProfileForm) => {
    mutate({
      ...values,
    });
  };
  return {
    initialValues,
    handleSubmit,
  };
};

export default useUpdateProfile;

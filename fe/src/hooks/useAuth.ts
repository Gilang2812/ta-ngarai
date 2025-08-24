import { useAuthStore } from "@/stores/AuthStore";
import { confirmAlert } from "@/utils/AlertUtils";
import { signOut, useSession } from "next-auth/react";

const useAuth = () => {
  const { updateUser } = useAuthStore();
  const { data: session } = useSession();
  const logout = () => {
    signOut();
  };
  const handleLogout = () => {
    confirmAlert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      () => {
        logout();
      }
    );
  };

  return {
    user: session?.user,
    handleLogout,
    updateUser,
    logout,
  };
};

export default useAuth;

import { ROUTES } from "@/data/routes";
import { useAuthStore } from "@/stores/AuthStore";
import { confirmAlert } from "@/utils/AlertUtils";

const useAuth = () => {
  const { user, clearUser } = useAuthStore();
  
  const logout = () => {
    clearUser();
    localStorage.removeItem("token");
    if (
      location.pathname !== ROUTES.HOME ||
      location.pathname !== ROUTES.PACKAGE
    ) {
      location.reload();
    }
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
    user,
    handleLogout,
  };
};

export default useAuth;

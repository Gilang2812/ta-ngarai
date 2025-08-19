import { useAuthStore } from "@/stores/AuthStore";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "./useAuth";
import Swal from "sweetalert2";

const useUserRole = () => {
  const { user, setLastPathname } = useAuthStore();
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const isAdmin = user?.role === 2;
  const isSeller = user && user?.store?.length > 0;
  const isAuth = !!user || !!token;
  const isUserAuth = !isAdmin && isAuth;
  const handleUnAuth = () => {
    if (!isAuth) {
      Swal.fire({
        title: "Unauthorized",
        text: "You need to login to access this page.",
        icon: "warning",
        confirmButtonText: "Login",
      }).then(() => {
        logout();
        setLastPathname(pathname);
        router.push("/login");
      });
    }
  };
  return { isAdmin, isSeller, isAuth, isUserAuth, handleUnAuth };
};

export default useUserRole;

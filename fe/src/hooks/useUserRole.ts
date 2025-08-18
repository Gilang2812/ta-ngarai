import { useAuthStore } from "@/stores/AuthStore";

const useUserRole = () => {
  const { user } = useAuthStore();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const isAdmin = user?.role === 2;
  const isSeller = user && user?.store?.length > 0;
  const isAuth = !!user && !!token;
  const isUserAuth = !isAdmin && isAuth;
  return { isAdmin, isSeller, isAuth, isUserAuth };
};

export default useUserRole;

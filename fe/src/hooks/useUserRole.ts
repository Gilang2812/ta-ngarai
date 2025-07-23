import { useAuthStore } from "@/stores/AuthStore";

const useUserRole = () => {
  const { user } = useAuthStore();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const isAdmin = user?.role === 2;
  const isSeller = !!user?.id_souvenir_place;
  const isAuth = !!user && !!token;
  return { isAdmin, isSeller, isAuth };
};

export default useUserRole;

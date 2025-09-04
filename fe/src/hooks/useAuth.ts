import { ROUTES } from "@/data/routes";
import { confirmAlert } from "@/utils/AlertUtils";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const useAuth = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  let url: URL | null = null;
  if (typeof window !== "undefined") {
    url = new URL(ROUTES.LOGIN, window.location.origin);
    url.searchParams.set("callbackUrl", encodeURI(pathName));
  }
  const logout = () => {
    signOut();
    router.push(url?.toString() ?? "");
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
    logout,
  };
};

export default useAuth;

import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { ROUTES } from "@/data/routes";

const useUserRole = () => {
  const pathName = usePathname();
  const { data, status } = useSession();
  const user = data?.user;
  const router = useRouter();
  const isAdmin = !!(user?.role && parseInt(user?.role) === 2);
  const isSeller = user?.store && user?.store?.length > 0;
  const isAuth = status === "authenticated";
  const isUserAuth = !isAdmin && isAuth;
  let url: URL | null = null;
  if (typeof window !== "undefined") {
    url = new URL(ROUTES.LOGIN, window.location.origin);
    url.searchParams.set("callbackUrl", encodeURI(pathName));
  }

  const handleUnAuth = () => {
    if (!isAuth) {
      Swal.fire({
        title: "Unauthorized",
        text: "You need to login to access this page.",
        icon: "warning",
        confirmButtonText: "Login",
      }).then(() => {
        router.push(url?.toString() ?? "");
      });
    }
  };
  return { isAdmin, isSeller, isAuth, isUserAuth, handleUnAuth };
};

export default useUserRole;

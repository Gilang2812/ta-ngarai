import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { ROUTES } from "@/data/routes";

const useUserRole = () => {
  const pathName = usePathname();
  const { data, status } = useSession();
  const router = useRouter();
  const user = data?.user ||null;
  const store = user?.store;
  const isAdmin = !!(user?.role && Number(user?.role) === 2);
  const isSeller = store && store?.length > 0;
  const isOwner = (id_souvenir_place: string) =>
    isSeller &&
    store.some((s) => s.id_souvenir_place.includes(id_souvenir_place));
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
  return { isAdmin, isSeller, isAuth, isUserAuth, handleUnAuth, isOwner, user };
};

export default useUserRole;

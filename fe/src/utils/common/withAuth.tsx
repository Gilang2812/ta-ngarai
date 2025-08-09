"use client";

import { ROUTES } from "@/data/routes";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

type RoleType = "admin" | "guest" | "auth";

interface WithAuthProps {
  role: RoleType;
}

const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  { role }: WithAuthProps
) => {
  const Wrapper = (props: P) => {
    const { user } = useAuthStore();
    const isAdmin = user?.role === 2;
    const router = useRouter();
    const pathName = usePathname();
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    useEffect(() => {
      const needsProfileUpdate =
        user &&
        !user.phone &&
        pathName !== ROUTES.UPDATE_PROFILE &&
        pathName !== ROUTES.PROFILE;
      const showProfileUpdateAlert = async () => {
        await Swal.fire({
          title: "Update Profile",
          text: "Please complete your profile information.",
          icon: "warning",
          showConfirmButton: true,
        });
        router.replace(ROUTES.UPDATE_PROFILE);
      };

      if (role === "guest") {
        if (token && user) {
          if (needsProfileUpdate) showProfileUpdateAlert();
          router.replace("/web");
        }
        return;
      }

      if (!token || !user) {
        router.replace("/login");
        return;
      }

      if (role === "admin" && !isAdmin) {
        router.replace("/web");
        if (needsProfileUpdate) showProfileUpdateAlert();
      } else if (needsProfileUpdate) {
        showProfileUpdateAlert();
      }
    }, [router, user, token, isAdmin, pathName]);
    return <Component {...props} />;
  };

  return Wrapper;
};

export default withAuth;

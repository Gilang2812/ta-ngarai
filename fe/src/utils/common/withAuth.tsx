"use client";

import MainSkeletonLoader from "@/components/loading/MainSkeletonLoader";
import { ROUTES } from "@/data/routes";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

    // ⬇️ tambahin state loading biar ga buru-buru redirect
    const [ready, setReady] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
      }
      setReady(true); // tandain kalau udah siap check
    }, []);

    useEffect(() => {
      if (!ready) return; // ⬅️ tunggu sampai token dan user siap

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
    }, [ready, router, user, token, isAdmin, pathName]);

    if (!ready) {
      return <MainSkeletonLoader />; // bisa spinner biar lebih bagus
    }

    return <Component {...props} />;
  };

  return Wrapper;
};

export default withAuth;

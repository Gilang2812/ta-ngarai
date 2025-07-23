"use client";

import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    useEffect(() => {
      if (role !== "guest") {
        if (!token || !user) {
          router.replace("/login");
        }
        if (!isAdmin && role === "admin") {
          router.replace("/web");
        }
      } else {
        if (token && user) {
          router.replace("/web");
        }
      }
    }, [router, user, token, isAdmin]);
    return <Component {...props} />;
  };

  return Wrapper;
};

export default withAuth;

"use client";
import { UserNav } from "@/components/nav/UserNav";
import SidebarLayout from "@/layouts/SidebarLayout";
import { useAuthStore } from "@/stores/AuthStore";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("user", user);
    console.log("token", token);
  }, [user]);

  return <SidebarLayout NavComponent={UserNav}>{children}</SidebarLayout>;
}

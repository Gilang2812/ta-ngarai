"use client";
import AuthNav from "@/components/nav/AuthNav";
import { UserNav } from "@/components/nav/UserNav";
import { ROUTES } from "@/data/routes";
import SidebarLayout from "@/layouts/SidebarLayout";
import { usePathname } from "next/navigation";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  console.log("Current Path:", pathName);
  console.log(
    "Current Path Starts With Profile:",
    pathName.startsWith(ROUTES.PROFILE)
  );
  const isProfilePage = pathName.startsWith(ROUTES.PROFILE);
  return <SidebarLayout NavComponent={isProfilePage ? AuthNav : UserNav}>{children}</SidebarLayout>;
}

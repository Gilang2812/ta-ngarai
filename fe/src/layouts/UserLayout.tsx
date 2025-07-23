"use client";
import { UserNav } from "@/components/nav/UserNav";
import SidebarLayout from "@/layouts/SidebarLayout"; 

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout NavComponent={UserNav}>{children}</SidebarLayout>;
}

"use client";
import { AdminNav } from "@/components/nav/AdminNav";
import SidebarLayout from "@/layouts/SidebarLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout NavComponent={AdminNav}>{children}</SidebarLayout>;
}

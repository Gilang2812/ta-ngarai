"use client";
import withAuth from "@/utils/common/withAuth";
import { Fragment } from "react";

function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return <Fragment>{children}</Fragment>;
}

export default withAuth(AdminAuthLayout, { role: "admin" });
